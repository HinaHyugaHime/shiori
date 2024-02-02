import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  inlineCode,
} from 'discord.js';
import {Logger} from 'pino';

import gelbooru from '../lib/gelbooru';
import BaseCommand from '../structures/BaseCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Gelbooru extends BaseCommand {
  public slashCommandData: SlashCommandBuilder;
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        cooldown: 1500,
        description: 'Fetches an image with specific tags from gelbooru',
        hidden: false,
        name: 'gelbooru',
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
      const {post} = await gelbooru(tags);
      const randomPost = post[Math.floor(Math.random() * post.length)];
      return interaction.followUp({
        embeds: [
          new EmbedBuilder()
            .setColor('Blue')
            .setImage(
              randomPost.file_url ??
                randomPost.large_file_url ??
                randomPost.preview_file_url
            )
            .setURL(
              `https://gelbooru.com/index.php?page=post&s=view&id=${randomPost.id}`
            )
            .setTitle('Open in Gelbooru'),
        ],
      });
    } catch (err) {
      this.logger.error(
        err,
        `Shiori ran into an error while fetching images from Gelbooru with tags: ${tags}`
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
