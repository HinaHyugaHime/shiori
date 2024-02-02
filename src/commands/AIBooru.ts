import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  inlineCode,
} from 'discord.js';
import {extname} from 'node:path';
import {Logger} from 'pino';

import aibooru from '../lib/aibooru';
import BaseCommand from '../structures/BaseCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class AIBooru extends BaseCommand {
  public slashCommandData: SlashCommandBuilder;
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        cooldown: 1500,
        description: 'Fetches an image with specific tags from aibooru',
        hidden: false,
        name: 'aibooru',
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
          .setRequired(false)
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
    const tags = interaction.options.getString('tags', false) ?? '';
    await interaction.deferReply();
    try {
      const {file_url, id, large_file_url, preview_file_url} =
        await aibooru(tags);
      let url = '';
      if (extname(file_url) !== '.mp4') {
        url = file_url;
      } else if (extname(large_file_url) !== '.mp4') {
        url = large_file_url;
      } else if (extname(preview_file_url) !== '.mp4') {
        url = preview_file_url;
      }
      if (url) {
        return interaction.followUp({
          embeds: [
            new EmbedBuilder()
              .setColor('Blue')
              .setImage(url)
              .setURL(`https://aibooru.online/posts/${id}`)
              .setTitle('Open in AIBooru'),
          ],
        });
      }
    } catch (err) {
      this.logger.error(
        err,
        `Shiori ran into an error while fetching images from Aibooru with tags: ${tags}`
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
