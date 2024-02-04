import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  ComponentType,
  EmbedBuilder,
  inlineCode,
  userMention,
} from 'discord.js';
import {Logger} from 'pino';

import request from '../lib/request';
import BaseCommand from '../structures/BaseCommand';
import Shiori from '../structures/Shiori';
import {CommandType, IPurrResponse} from '../types';

export default class Fuck extends BaseCommand {
  public fallbackGIFs: string[];
  public url: string;
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        cooldown: 1500,
        description: 'fuck someone (as a "joke")!~',
        hidden: false,
        name: 'fuck',
        type: CommandType.NSFW,
      },
      logger
    );
    this.fallbackGIFs = [
      'https://c.tenor.com/FmBSx-Wr1QgAAAAd/anime-redo-of-healer.gif',
      'https://c.tenor.com/9G1zsVIiV6UAAAAC/anime-bed.gif',
      'https://c.tenor.com/cVRLCEed9hwAAAAC/moan-anime.gif',
      'https://c.tenor.com/NG4_VAKWTc8AAAAd/anime-blush.gif',
    ];
    this.slashCommandData.addUserOption(option =>
      option
        .setName('partner')
        .setDescription('The user to fuck')
        .setRequired(true)
    );
    this.url = 'https://purrbot.site/api/img/nsfw/fuck/gif';
  }

  public async getEmbedUrl() {
    const {link} = await request<IPurrResponse>(this.url).catch(e => {
      this.logger.error(
        e,
        `Shiori ran into an error while fetching an image from endpoint: ${this.url}:`
      );
      return {
        link: this.fallbackGIFs[
          Math.floor(Math.random() * this.fallbackGIFs.length)
        ],
      };
    });
    return link;
  }

  public getHelpEmbed() {
    return super.getHelpEmbed().addFields([
      {
        name: 'Usage:',
        value: `${inlineCode('/fuck')} ${inlineCode('@user')}`,
      },
      {
        name: 'Example:',
        value: `${inlineCode('/fuck')} ${inlineCode('@Shiori')}`,
      },
    ]);
  }

  public async run(interaction: ChatInputCommandInteraction) {
    const partner = interaction.options.getUser('partner', true);
    const user = interaction.user.id;
    if (user === partner.id) {
      return interaction.reply({
        content: "Eww, if I were you I won't...",
      });
    }
    if (partner.id === this.shiori.user!.id) {
      return interaction.reply({
        content: "I'm flattered, but I'm not interested in you that way!",
      });
    }
    if (partner.bot) {
      return interaction.reply({
        content: 'Imagine trying to fuck a discord bot... Touch grass, mate.',
      });
    }
    const message = await interaction.reply({
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Success)
            .setLabel('Accept')
            .setCustomId('accept'),
          new ButtonBuilder()
            .setStyle(ButtonStyle.Danger)
            .setLabel('Decline')
            .setCustomId('decline')
        ),
      ],
      embeds: [
        new EmbedBuilder()
          .setColor('Blue')
          .setDescription(
            `Hey ${userMention(partner.id)}, ${userMention(
              user
            )} wants to fuck you, interested?`
          )
          .setFooter({
            text: 'You have 30 seconds to respond to this proposal by clicking the button below!',
          }),
      ],
    });
    try {
      const confirmation = await message.awaitMessageComponent({
        componentType: ComponentType.Button,
        filter: i => i.user.id === partner.id,
        time: 30000,
      });
      if (confirmation.customId === 'accept') {
        const url = await this.getEmbedUrl();
        await confirmation.update({
          components: [],
          content: `${userMention(user)} fucked ${userMention(partner.id)}, that's hot ngl...`,
          embeds: [new EmbedBuilder().setImage(url)],
        });
      } else if (confirmation.customId === 'cancel') {
        await confirmation.update({
          components: [],
          content: 'uhhh, they said no, sorry :/',
        });
      }
    } catch (e) {
      return await message.edit({
        components: [],
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setTitle('[Expired]')
            .setDescription(
              `Hey ${userMention(partner.id)}, ${userMention(
                user
              )} wants to fuck you, interested?`
            )
            .setFooter({
              text: 'This interaction has expired.',
            }),
        ],
      });
    }
  }
}
