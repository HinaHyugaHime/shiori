import {
  ChannelType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  inlineCode,
} from 'discord.js';
import {Logger} from 'pino';
import prettyMilliseconds from 'pretty-ms';

import BaseCommand from '../structures/BaseCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Help extends BaseCommand {
  public slashCommandData: SlashCommandBuilder;
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        cooldown: 1500,
        description: 'Shows you the help menu',
        hidden: false,
        name: 'help',
        type: CommandType.SFW,
      },
      logger
    );
    this.slashCommandData = new SlashCommandBuilder()
      .setName(this.name)
      .addStringOption(option =>
        option
          .setDescription('The command to get help for')
          .setName('command')
          .setRequired(false)
      )
      .setDescription(this.description);
  }

  public getHelpEmbed(includeNSFW = false) {
    const embed = new EmbedBuilder()
      .setTitle('Here is a list of my commands:')
      .setColor('Blue')
      .addFields([
        {
          name: 'Aliases:',
          value:
            this.shiori.aliases.map(x => inlineCode(x)).join(', ') || 'None',
        },
        {
          name: 'Cooldown:',
          value: prettyMilliseconds(this.cooldown),
        },
        {
          name: 'Description:',
          value: this.description,
        },
        {
          name: 'Usage:',
          value: `${inlineCode('/help')} ${inlineCode('command')}`,
        },
        {
          name: 'SFW Commands:',
          value: this.shiori.commands
            .filter(x => x.type === CommandType.SFW && !x.hidden)
            .sort()
            .map(x => inlineCode(x.name))
            .join(', '),
        },
      ]);
    if (includeNSFW) {
      embed.addFields([
        {
          name: 'NSFW Commands:',
          value: this.shiori.commands
            .filter(x => x.type === CommandType.NSFW && !x.hidden)
            .sort()
            .map(x => inlineCode(x.name))
            .join(', '),
        },
      ]);
    } else {
      embed.setFooter({
        text: 'NSFW commands have been removed, run this command in a NSFW channel to see them',
      });
    }
    return embed;
  }

  public async run(interaction: ChatInputCommandInteraction) {
    const command = interaction.options.getString('command', false);
    const isNSFW =
      interaction.channel?.type === ChannelType.GuildText &&
      interaction.channel.nsfw;
    if (!command) {
      return interaction.reply({
        embeds: [this.getHelpEmbed(isNSFW)],
      });
    }
    const cmd = this.shiori.commands.get(command);
    if (!cmd) {
      return interaction.reply({
        content: `uhh, what? I don't know what ${command} is supposed to mean.`,
      });
    }
    if (!isNSFW && cmd.type === CommandType.NSFW) {
      return interaction.reply({
        content: `Shh, the kids are around, run this in a NSFW channel!~`,
      });
    }
    return interaction.reply({
      embeds: [cmd.getHelpEmbed()],
    });
  }
}
