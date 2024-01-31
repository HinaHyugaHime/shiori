import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  inlineCode,
  userMention,
} from 'discord.js';
import {Logger} from 'pino';

import BaseCommand from '../structures/BaseCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Partner extends BaseCommand {
  public slashCommandData: SlashCommandBuilder;
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        cooldown: 1500,
        description: "know your partner (or someone else's)!~",
        hidden: false,
        name: 'partner',
        type: CommandType.SFW,
      },
      logger
    );
    this.slashCommandData = new SlashCommandBuilder()
      .setName(this.name)
      .addUserOption(option =>
        option
          .setName('user')
          .setDescription('The user to find partner of')
          .setRequired(false)
      )
      .setDescription(this.description);
  }

  public getHelpEmbed() {
    return super.getHelpEmbed().addFields([
      {
        name: 'Example:',
        value: `${inlineCode('/partner')} ${inlineCode('@Shiori')}`,
      },
    ]);
  }

  public async run(interaction: ChatInputCommandInteraction) {
    const user =
      interaction.options.getUser('user', false)?.id ?? interaction.user.id;
    const isMarried = this.shiori.marriages.get(user);
    if (isMarried) {
      if (isMarried.partner === interaction.user.id) {
        return interaction.reply({
          content: `${userMention(user)} is married to you!~`,
        });
      } else {
        if (user === interaction.user.id) {
          return interaction.reply({
            content: `You are married to ${userMention(isMarried.partner)}!~`,
          });
        }
        return interaction.reply({
          content: `${userMention(user)} is married to ${userMention(isMarried.partner)}!~`,
        });
      }
    }
    if (user === interaction.user.id) {
      return interaction.reply({
        content: 'You are single...',
      });
    }
    return interaction.reply({
      content: `${userMention(user)} is single (you seem kinda interested?)`,
    });
  }
}
