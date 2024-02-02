import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  inlineCode,
} from 'discord.js';
import {Logger} from 'pino';

import aibooru from '../lib/aibooru';
import BaseCommand from '../structures/BaseCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class AIBooruSafe extends BaseCommand {
  public slashCommandData: SlashCommandBuilder;
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: ['s-aibooru'],
        cooldown: 1500,
        description:
          'Fetches an image with specific tags from aibooru (safe/sfw)',
        hidden: false,
        name: 'aibooru-safe',
        type: CommandType.SFW,
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
      const {file_ext, file_url, id, large_file_url, preview_file_url} =
        await aibooru(tags, true);
      const url = file_url ?? large_file_url ?? preview_file_url;
      if (url && file_ext !== 'mp4') {
        return interaction.followUp({
          embeds: [
            new EmbedBuilder()
              .setColor('Blue')
              .setImage(url)
              .setURL(`https://safe.aibooru.online/posts/${id}`)
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
