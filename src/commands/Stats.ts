import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  version,
} from 'discord.js';
import {cpus} from 'node:os';
import {Logger} from 'pino';
import prettyBytes from 'pretty-bytes';
import prettyMilliseconds from 'pretty-ms';

import BaseCommand from '../structures/BaseCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Stats extends BaseCommand {
  public slashCommandData: SlashCommandBuilder;
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        cooldown: 1500,
        description: 'Shows you my stats',
        hidden: false,
        name: 'stats',
        type: CommandType.SFW,
      },
      logger
    );
    this.slashCommandData = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description);
  }

  public getStatsEmbed(includeRoundtrip = true) {
    const embed = new EmbedBuilder()
      .setTitle(`Shiori's Stats`)
      .setColor('Blue')
      .addFields([
        {
          inline: true,
          name: 'CPU Model:',
          value: cpus()[0].model,
        },
        {
          inline: true,
          name: 'Discord Ping:',
          value: `${this.shiori.ws.ping}ms`,
        },
        {
          inline: true,
          name: 'Discord.js Version:',
          value: version,
        },
        {
          inline: true,
          name: 'Memory Usage:',
          value: prettyBytes(process.memoryUsage.rss()),
        },
        {
          inline: true,
          name: 'Process Uptime:',
          value: prettyMilliseconds(Bun.nanoseconds() / 1000000),
        },
      ]);
    if (includeRoundtrip) {
      embed.addFields([
        {
          inline: true,
          name: 'Roundtrip Latency:',
          value: 'Calculating...',
        },
      ]);
    }
    return embed;
  }

  public async run(interaction: ChatInputCommandInteraction) {
    const sent = await interaction.reply({
      embeds: [this.getStatsEmbed()],
      fetchReply: true,
    });
    await interaction.editReply({
      embeds: [
        this.getStatsEmbed(false).addFields({
          inline: true,
          name: 'Roundtrip Latency:',
          value: `${sent.createdTimestamp - interaction.createdTimestamp}ms`,
        }),
      ],
    });
  }
}
