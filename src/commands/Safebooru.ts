import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  inlineCode,
} from 'discord.js';
import {Logger} from 'pino';

import safebooru from '../lib/safebooru';
import BaseCommand from '../structures/BaseCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Safebooru extends BaseCommand {
  public slashCommandData: SlashCommandBuilder;
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        cooldown: 1500,
        description: 'Fetches an image with specific tags from safebooru',
        hidden: false,
        name: 'safebooru',
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
      const posts = await safebooru(tags);
      const post = posts[Math.floor(Math.random() * posts.length)];
      return interaction.followUp({
        embeds: [
          new EmbedBuilder()
            .setColor('Blue')
            .setImage(
              `https://safebooru.org/images/${post.directory}/${post.image}`
            )
            .setURL(
              `https://safebooru.org/index.php?page=post&s=view&id=${post.id}`
            )
            .setTitle('Open in Safebooru'),
        ],
      });
    } catch (err) {
      this.logger.error(
        err,
        `Shiori ran into an error while fetching images from Safebooru with tags: ${tags}`
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
