import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  GuildMember,
  SlashCommandBuilder,
  User,
  inlineCode,
} from 'discord.js';
import {Logger} from 'pino';
import prettyMilliseconds from 'pretty-ms';

import BaseCommand from '../structures/BaseCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Profile extends BaseCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        cooldown: 1500,
        description: 'Shows you your profile information',
        hidden: false,
        name: 'profile',
        type: CommandType.SFW,
      },
      logger
    );
    this.slashCommandData = new SlashCommandBuilder()
      .setName(this.name)
      .addUserOption(option =>
        option
          .setName('user')
          .setDescription('The user you want to see the profile of')
          .setRequired(false)
      )
      .setDescription(this.description);
  }

  public async run(interaction: ChatInputCommandInteraction) {
    const targetUser =
      interaction.options.getUser('user', false) ?? interaction.user;
    if (!interaction.guild) {
      return;
    }
    let member: GuildMember | null = null;
    try {
      member = await interaction.guild.members.fetch(targetUser.id);
    } catch (err) {
      member = null;
    }
    const embed = new EmbedBuilder()
      .setTitle(
        targetUser.id === interaction.user.id
          ? 'Here is your profile information!~'
          : `Here is ${targetUser.username}'s profile information!~`
      )
      .setImage(targetUser.displayAvatarURL({size: 4096}))
      .addFields([
        {
          name: 'User ID',
          value: targetUser.id,
        },
        {
          name: 'Username',
          value: inlineCode('@' + targetUser.username),
        },
        {
          name: 'Account Age',
          value: prettyMilliseconds(Date.now() - targetUser.createdTimestamp),
        },
      ])
      .setColor('Blue');
    if (member) {
      embed.addFields([
        {
          name: 'Nickname',
          value: member.nickname ?? 'None',
        },
        {
          name: 'Joined Server',
          value: member.joinedTimestamp
            ? prettyMilliseconds(Date.now() - member.joinedTimestamp)
            : 'Unknown',
        },
      ]);
    }
    if (targetUser.bot) {
      embed.setFooter({
        text: 'Beep boop, boop beep! This user is a bot!~',
      });
    }
    if (this.shiori.marriages.has(targetUser.id)) {
      const {partner} = this.shiori.marriages.get(targetUser.id)!;
      let partnerUser: User | null = null;
      try {
        partnerUser = await this.shiori.users.fetch(partner);
      } catch (err) {
        partnerUser = null;
      }
      if (partnerUser) {
        embed.addFields([
          {
            name: 'Married To',
            value: `${inlineCode('@' + partnerUser.username)}`,
          },
        ]);
      }
    }
    if (this.shiori.afkUsers.has(targetUser.id)) {
      const {message} = this.shiori.afkUsers.get(targetUser.id)!;
      embed.addFields([
        {
          name: 'AFK',
          value: message,
        },
      ]);
    }
    if (targetUser.id === Bun.env['SHIORI_MOMMY_ID']) {
      embed.setFooter({
        text: 'Psst, staph stalking my mommy!~ >///<',
      });
    }
    return interaction.reply({
      embeds: [embed],
    });
  }
}
