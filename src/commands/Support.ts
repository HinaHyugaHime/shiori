import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  inlineCode,
  userMention,
} from 'discord.js';
import {Logger} from 'pino';

import BaseCommand from '../structures/BaseCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Support extends BaseCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        cooldown: 1500,
        description: 'Shows you the support information',
        hidden: false,
        name: 'support',
        type: CommandType.SFW,
      },
      logger
    );
  }

  public async run(interaction: ChatInputCommandInteraction) {
    const mommy = await this.shiori.users.fetch(
      `${Bun.env['SHIORI_MOMMY_ID']}`,
      {
        cache: true,
      }
    );
    let guildHasMommy = false;
    try {
      await interaction.guild?.members.fetch(mommy.id);
      guildHasMommy = true;
    } catch (err) {
      guildHasMommy = false;
    }
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Shiori's Support Information")
          .setURL(
            `https://discord.gg/${Bun.env['SHIORI_SUPPORT_SERVER_INVITE']}`
          )
          .addFields([
            {
              name: 'Found a bug or have a feature request',
              value:
                'Join the support server and report it in the #shiori channel',
            },
            {
              name: 'Bot Invite',
              value: `[Click here](https://canary.discord.com/api/oauth2/authorize?client_id=${this.shiori.user?.id}&permissions=274878220352&scope=applications.commands%20bot)`,
            },
            {
              name: 'Support Server',
              value: `[Click here](https://discord.gg/${Bun.env['SHIORI_SUPPORT_SERVER_INVITE']})`,
            },
            {
              name: "Shiori's Mommy",
              value: guildHasMommy
                ? `${userMention(mommy.id)}`
                : `${inlineCode('@' + mommy.username)}`,
            },
          ])
          .setColor('Blue'),
      ],
    });
  }
}
