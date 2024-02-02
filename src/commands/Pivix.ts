import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  inlineCode,
} from 'discord.js';
import {Logger} from 'pino';

import pivix from '../lib/pivix';
import BaseCommand from '../structures/BaseCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Pivix extends BaseCommand {
  public slashCommandData: SlashCommandBuilder;
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        cooldown: 1500,
        description: 'Fetches an image with specific tags from pivix',
        hidden: false,
        name: 'pivix',
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
      const res = await pivix(tags);
      if (res?.url) {
        return interaction.followUp({
          embeds: [
            new EmbedBuilder()
              .setColor('Blue')
              .setImage(res.url)
              .setURL(`https://pixiv.pics/artworks/${res.id}`)
              .setTitle('Open in Pivix'),
          ],
        });
      }
    } catch (err) {
      this.logger.error(
        err,
        `Shiori ran into an error while fetching images from Pivix with tags: ${tags}`
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
