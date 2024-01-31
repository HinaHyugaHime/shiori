import {EmbedBuilder, Events, Interaction} from 'discord.js';
import {Logger} from 'pino';
import prettyMilliseconds from 'pretty-ms';

import BaseEvent from '../structures/BaseEvent';
import Shiori from '../structures/Shiori';

export default class InteractionCreate extends BaseEvent {
  public constructor(shiori: Shiori, logger: Logger) {
    super(shiori, Events.InteractionCreate, logger);
  }

  public async run(interaction: Interaction) {
    if (!interaction.isChatInputCommand() || interaction.user.bot) {
      return;
    }
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
