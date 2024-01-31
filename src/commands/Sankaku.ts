import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  inlineCode,
} from 'discord.js';
import {Logger} from 'pino';

import sankaku from '../lib/sankaku';
import BaseCommand from '../structures/BaseCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Sankaku extends BaseCommand {
  public slashCommandData: SlashCommandBuilder;
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: ['sank'],
        cooldown: 1500,
        description: 'Fetches an image with specific tags from sankaku',
        hidden: false,
        name: 'sankaku',
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
    const tags = interaction.options.getString('tags', false);
    await interaction.deferReply();
    try {
      const {data} = await sankaku(this.shiori.sankakuAuthToken, tags ?? '');
      const validImages = data.filter(x => x.file_type !== 'video/mp4');
      const url = validImages[Math.floor(Math.random() * validImages.length)];
      if (url) {
        return interaction.followUp({
          embeds: [
            new EmbedBuilder()
              .setColor('Blue')
              .setImage(url.file_url ?? url.sample_url ?? url.preview_url)
              .setURL(`https://sankaku.app/en/post/show/${url.id}`)
              .setTitle(`Open in Sankaku`),
          ],
        });
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
    } catch (err) {
      this.logger.error(
        err,
        `Shiori ran into an error while fetching images from Sankaku with tags: ${tags}`
      );
    }
  }
}
