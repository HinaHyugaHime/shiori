import {
  AttachmentBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  inlineCode,
} from 'discord.js';
import {Logger} from 'pino';

import nozomi from '../lib/nozomi';
import BaseCommand from '../structures/BaseCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Nozomi extends BaseCommand {
  public slashCommandData: SlashCommandBuilder;
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        cooldown: 1500,
        description: 'Fetches an image with specific tags from nozomi',
        hidden: false,
        name: 'nozomi',
        type: CommandType.NSFW,
      },
      logger
    );
    this.slashCommandData = new SlashCommandBuilder()
      .setName(this.name)
      .addStringOption(option =>
        option
          .setDescription('Tags describing your image')
          .setName('tags')
          .setRequired(true)
      )
      .setDescription(this.description)
      .setNSFW(true);
  }

  public getHelpEmbed() {
    return super.getHelpEmbed().addFields([
      {
        name: 'Usage:',
        value: `${inlineCode('/' + this.name)} "blonde_hair"`,
      },
    ]);
  }

  public async run(interaction: ChatInputCommandInteraction) {
    const tags = interaction.options.getString('tags', true).split(' ')[0];
    await interaction.deferReply();
    try {
      const res = await nozomi(tags);
      if (res) {
        return interaction.followUp({
          embeds: [
            new EmbedBuilder()
              .setColor('Blue')
              .setImage('attachment://request.png')
              .setURL(res.url)
              .setTitle('Open in Nozomi'),
          ],
          files: [new AttachmentBuilder(res.buffer).setName('request.png')],
        });
      }
    } catch (err) {
      this.logger.error(
        err,
        `Shiori ran into an error while fetching images from Nozomi with tags: ${tags}`
      );
    }
    return interaction.followUp({
      embeds: [
        new EmbedBuilder()
          .setColor('Red')
          .setTitle('Uh oh')
          .setDescription(
            'Shiori ran into an error while trying to search for your image :/'
          ),
      ],
    });
  }
}
