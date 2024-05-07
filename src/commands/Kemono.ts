import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  inlineCode,
} from 'discord.js';
import {Logger} from 'pino';

import kemono from '../lib/kemono';
import BaseCommand from '../structures/BaseCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Kemono extends BaseCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        cooldown: 1500,
        description: 'Fetches an image with specific tags from kemono',
        hidden: false,
        name: 'kemono',
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
      const posts = await kemono(tags).then(res =>
        res.filter(x => x.file.path)
      );
      const post = posts[Math.floor(Math.random() * posts.length)];
      return interaction.followUp({
        embeds: [
          new EmbedBuilder()
            .setColor('Blue')
            .setImage(`https://kemono.su${post.file.path}`)
            .setURL(
              `https://kemono.su/${post.service}/user/${post.user}/post/${post.id}`
            )
            .setTitle('Open in Kemono'),
        ],
      });
    } catch (err) {
      this.logger.error(
        err,
        `Shiori ran into an error while fetching images from Kemono with tags: ${tags}`
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
