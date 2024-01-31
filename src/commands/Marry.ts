import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  ComponentType,
  EmbedBuilder,
  SlashCommandBuilder,
  inlineCode,
  userMention,
} from 'discord.js';
import {Logger} from 'pino';

import Marriage from '../models/Marriage';
import BaseCommand from '../structures/BaseCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Marry extends BaseCommand {
  public slashCommandData: SlashCommandBuilder;
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        cooldown: 1500,
        description: 'marry someone!~',
        hidden: false,
        name: 'marry',
        type: CommandType.SFW,
      },
      logger
    );
    this.slashCommandData = new SlashCommandBuilder()
      .setName(this.name)
      .addUserOption(option =>
        option
          .setName('partner')
          .setDescription('The user to marry')
          .setRequired(true)
      )
      .setDescription(this.description);
  }

  public getHelpEmbed() {
    return super.getHelpEmbed().addFields([
      {
        name: 'Example:',
        value: `${inlineCode('/marry')} ${inlineCode('@Shiori')}`,
      },
    ]);
  }

  public async run(interaction: ChatInputCommandInteraction) {
    const partner = interaction.options.getUser('partner', true);
    const user = interaction.user.id;
    if (user === partner.id) {
      return interaction.reply({
        content: "Baka! You can't marry yourself!",
      });
    }
    const selfMarried = this.shiori.marriages.get(user);
    const partnerMarried = this.shiori.marriages.get(partner.id);
    if (selfMarried) {
      if (selfMarried.partner === partner.id) {
        return interaction.reply({
          content: `Heyyy, you two are already married!`,
        });
      } else {
        await interaction.reply({
          content: `Ain't no way I'm letting you cheat on ${userMention(selfMarried.partner)}!`,
        });
      }
    }
    if (partner.id === this.shiori.user!.id) {
      return interaction.reply({
        content: "I'm flattered, but I'm not interested in you that way!",
      });
    }
    if (partner.bot) {
      return interaction.reply({
        content: "Bro's down bad, huh?",
      });
    }
    if (partnerMarried) {
      return interaction.reply({
        content: `Nah, ${userMention(partner.id)} is already married to ${userMention(partnerMarried.partner)}!`,
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
          .setTitle('Marriage Proposal')
          .setDescription(
            `Hey ${userMention(partner.id)}, ${userMention(
              user
            )} wants to marry you!`
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
        await confirmation.update({
          components: [],
          content: 'Omg, they said YES! You two are now married!',
          embeds: [],
        });
        const marriage = new Marriage([user, partner.id]);
        await marriage.save();
        this.shiori.marriages.set(user, {...marriage, partner: partner.id});
        this.shiori.marriages.set(partner.id, {...marriage, partner: user});
      } else if (confirmation.customId === 'decline') {
        await confirmation.update({
          components: [],
          content: 'uhhh, they said no, sorry :/',
          embeds: [],
        });
      }
    } catch (e) {
      return await message.edit({
        components: [],
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setTitle('[Expired] Marriage Proposal')
            .setDescription(
              `Hey ${userMention(partner.id)}, ${userMention(
                user
              )} wants to marry you!`
            )
            .setFooter({
              text: 'This proposal has expired.',
            }),
        ],
      });
    }
  }
}
