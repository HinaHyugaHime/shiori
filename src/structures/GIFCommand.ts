import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  inlineCode,
  userMention,
} from 'discord.js';
import {Logger} from 'pino';

import {CommandType, IGIFCommandData, MessageContentGenerator} from '../types';
import BaseCommand from './BaseCommand';
import Shiori from './Shiori';

export default class GIFCommand extends BaseCommand {
  public contentGenerator: MessageContentGenerator;
  public fallbackGIFs: string[];
  public targetRequired: boolean;
  public targetRequiredMessage: string;
  public constructor(shiori: Shiori, data: IGIFCommandData, logger: Logger) {
    super(shiori, data, logger);
    this.contentGenerator = data.contentGenerator;
    this.fallbackGIFs = data.fallbackGIFs;
    this.targetRequired = data.targetRequired;
    this.slashCommandData = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .setNSFW(data.type === CommandType.NSFW);
    this.targetRequiredMessage = data.targetRequiredMessage;
    if (this.targetRequiredMessage) {
      this.slashCommandData.addUserOption(option =>
        option
          .setName('user')
          .setDescription(data.targetRequiredMessage)
          .setRequired(this.targetRequired)
      );
    }
  }

  public async getEmbedUrl() {
    return this.fallbackGIFs[
      Math.floor(Math.random() * this.fallbackGIFs.length)
    ];
  }

  public getHelpEmbed() {
    if (!this.targetRequiredMessage) {
      return super.getHelpEmbed();
    }
    return super.getHelpEmbed().addFields([
      {
        name: 'Usage:',
        value: `${inlineCode('/' + this.name)} ${this.targetRequiredMessage ? '@Shiori' : ''}`,
      },
    ]);
  }

  public async run(interaction: ChatInputCommandInteraction) {
    const targetUser = interaction.options.getUser('user', this.targetRequired);
    const url = await this.getEmbedUrl();
    if (!url) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setTitle('Uhh, something went wrong')
            .setDescription('I blame my mommy for this one'),
        ],
      });
    }
    await interaction.reply({
      content: this.contentGenerator(
        userMention(interaction.user.id),
        targetUser?.id ? userMention(targetUser.id) : ''
      ),
      embeds: [new EmbedBuilder().setColor('Blue').setImage(url)],
    });
  }
}
