import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  ComponentType,
  EmbedBuilder,
  userMention,
} from 'discord.js';
import {Logger} from 'pino';

import Marriage from '../models/Marriage';
import BaseCommand from '../structures/BaseCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Divorce extends BaseCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        cooldown: 1500,
        description: 'divorce your partner...',
        hidden: false,
        name: 'divorce',
        type: CommandType.SFW,
      },
      logger
    );
  }

  public async run(interaction: ChatInputCommandInteraction) {
    const user = interaction.user.id;
    const selfMarried = this.shiori.marriages.get(user);
    if (!selfMarried) {
      return interaction.reply({
        content: "Huh!? You're not married to anyone!",
      });
    }
    const {partner} = selfMarried;
    const message = await interaction.reply({
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Success)
            .setLabel('Yes')
            .setCustomId('yes'),
          new ButtonBuilder()
            .setStyle(ButtonStyle.Danger)
            .setLabel('No')
            .setCustomId('no')
        ),
      ],
      embeds: [
        new EmbedBuilder()
          .setColor('Blue')
          .setTitle('Divorce Confirmation')
          .setDescription(
            `Are you sure you want to divorce ${userMention(partner)}?`
          )
          .setFooter({
            text: 'You have 30 seconds to respond by clicking the button below!',
          }),
      ],
    });
    try {
      const confirmation = await message.awaitMessageComponent({
        componentType: ComponentType.Button,
        filter: i => i.user.id === user,
        time: 30000,
      });
      if (confirmation.customId === 'yes') {
        await confirmation.update({
          components: [],
          content:
            'Alright, I have filed the divorce papers, you are no longer married.',
          embeds: [],
        });
        await Marriage.updateOne(
          {
            _id: selfMarried._id,
          },
          {
            $set: {
              deleted: true,
              updatedAt: new Date(),
            },
          }
        );
        this.shiori.marriages.delete(user);
        this.shiori.marriages.delete(selfMarried.partner);
      } else if (confirmation.customId === 'no') {
        await confirmation.update({
          components: [],
          content:
            "Yeah, that's what I thought. I will not file the divorce papers.",
          embeds: [],
        });
      }
    } catch (e) {
      return await message.edit({
        components: [],
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setTitle('[Expired] Divorce Confirmation')
            .setDescription(
              `Are you sure you want to divorce ${userMention(partner)}?`
            )
            .setFooter({
              text: 'This confirmation has expired.',
            }),
        ],
      });
    }
  }
}
