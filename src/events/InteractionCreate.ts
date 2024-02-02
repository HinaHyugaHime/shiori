import {
  EmbedBuilder,
  Events,
  Interaction,
  inlineCode,
  userMention,
} from 'discord.js';
import {Logger} from 'pino';
import prettyMilliseconds from 'pretty-ms';

import isDebug from '../lib/isDebug';
import AFK from '../models/AFK';
import BaseEvent from '../structures/BaseEvent';
import Shiori from '../structures/Shiori';

export default class InteractionCreate extends BaseEvent {
  public constructor(shiori: Shiori, logger: Logger) {
    super(shiori, Events.InteractionCreate, logger);
  }

  public async afkHook(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) {
      return;
    }
    const isAFK = this.shiori.afkUsers.get(interaction.user.id);
    if (!isAFK) {
      return;
    }
    const afkCommand = this.shiori.commands.get('afk');
    if (
      afkCommand &&
      (interaction.commandName === afkCommand.name ||
        afkCommand.aliases.includes(interaction.commandName))
    ) {
      return;
    }
    try {
      await AFK.updateOne(
        {
          _id: isAFK._id,
        },
        {
          $set: {
            deleted: true,
            updatedAt: new Date(),
          },
        }
      );
      this.shiori.afkUsers.delete(isAFK.user);
      if (interaction.channel?.isTextBased()) {
        return interaction.channel.send(
          `Heyyy ${userMention(isAFK.user)}, Welcome back from your ${inlineCode(prettyMilliseconds(new Date().getTime() - new Date(isAFK.createdAt).getTime()))} long AFK session!~`
        );
      }
    } catch (err) {
      this.logger.error(
        err,
        'Shiori ran into an error while removing AFK status for an user',
        interaction
      );
    }
  }

  public async run(interaction: Interaction) {
    if (!interaction.isChatInputCommand() || interaction.user.bot) {
      return;
    }
    if (isDebug && interaction.guild?.id !== Bun.env['SHIORI_DEBUG_GUILD_ID']) {
      return;
    }
    this.afkHook(interaction).catch(err =>
      this.logger.error(
        err,
        'Shiori ran into an error while running the AFK hook'
      )
    );
    this.logger.info(
      {
        commandName: interaction.commandName,
        guild: interaction.guild?.name,
        user: interaction.user.tag,
      },
      `Slash command: ${interaction.commandName} was executed by: ${interaction.user.tag} in: ${interaction.guild?.name}`
    );
    const alias = this.shiori.aliases.get(interaction.commandName);
    const cmd = alias
      ? this.shiori.commands.get(alias)
      : this.shiori.commands.get(interaction.commandName);
    if (cmd && !cmd.hidden) {
      try {
        const time = cmd.cooldowns.get(interaction.user.id);
        if (time && time - Date.now() > 0) {
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle(
                  `Slow down a little! You can use this command after ${prettyMilliseconds(
                    time - Date.now(),
                    {
                      compact: true,
                    }
                  )}`
                )
                .setColor('Red'),
            ],
          });
        } else {
          cmd.cooldowns.delete(interaction.user.id);
        }
        cmd.cooldowns.set(interaction.user.id, Date.now() + cmd.cooldown);
        await cmd.run(interaction);
      } catch (err) {
        this.logger.error(err);
      }
    } else {
      this.logger.warn(
        `Slash command: ${interaction.commandName} was not found in the commands collection`
      );
    }
  }
}
