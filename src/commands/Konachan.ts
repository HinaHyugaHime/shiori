import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  inlineCode,
} from 'discord.js';
import {Logger} from 'pino';

import moebooru from '../lib/moebooru';
import BaseCommand from '../structures/BaseCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class KonaChan extends BaseCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        cooldown: 1500,
        description: 'Fetches an image with specific tags from konachan',
        hidden: false,
        name: 'konachan',
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
      const posts = await moebooru(tags, 'https://konachan.com');
      const randomPost = posts[Math.floor(Math.random() * posts.length)];
      if (randomPost) {
        return interaction.followUp({
          embeds: [
            new EmbedBuilder()
              .setColor('Blue')
              .setImage(
                randomPost.jpeg_url ??
                  randomPost.file_url ??
                  randomPost.preview_url
              )
              .setURL(`https://konachan.com/post/show/${randomPost.id}`)
              .setTitle('Open in KonaChan'),
          ],
        });
      }
    } catch (err) {
      this.logger.error(
        err,
        `Shiori ran into an error while fetching images from KonaChan with tags: ${tags}`
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
