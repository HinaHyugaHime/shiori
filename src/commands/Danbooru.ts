import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  inlineCode,
} from 'discord.js';
import {Logger} from 'pino';

import danbooru from '../lib/danbooru';
import BaseCommand from '../structures/BaseCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Danbooru extends BaseCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: ['dan'],
        cooldown: 1500,
        description: 'Fetches an image with specific tags from danbooru',
        hidden: false,
        name: 'danbooru',
        type: CommandType.NSFW,
      },
      logger
    );
    this.slashCommandData.addStringOption(option =>
      option
        .setDescription('Tags describing your image')
        .setName('tags')
        .setRequired(false)
    );
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
        await danbooru(tags);
      const url = file_url ?? large_file_url ?? preview_file_url;
      if (url && file_ext !== 'mp4') {
        return interaction.followUp({
          embeds: [
            new EmbedBuilder()
              .setColor('Blue')
              .setImage(url)
              .setURL(`https://danbooru.donmai.us/posts/${id}`)
              .setTitle('Open in Donmai'),
          ],
        });
      }
    } catch (err) {
      this.logger.error(
        err,
        `Shiori ran into an error while fetching images from Danbooru with tags: ${tags}`
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
