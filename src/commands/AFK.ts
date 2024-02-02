import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import {Logger} from 'pino';

import AFKModel from '../models/AFK';
import BaseCommand from '../structures/BaseCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class AFK extends BaseCommand {
  public slashCommandData: SlashCommandBuilder;
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        cooldown: 1500,
        description: 'Marks you as AFK in the chat',
        hidden: false,
        name: 'afk',
        type: CommandType.SFW,
      },
      logger
    );
    this.slashCommandData = new SlashCommandBuilder()
      .setName(this.name)
      .addStringOption(option =>
        option
          .setDescription('Message to respond with on ping')
          .setName('message')
          .setRequired(false)
          .setMaxLength(1600)
      )
      .setDescription(this.description);
  }

  public async run(interaction: ChatInputCommandInteraction) {
    const message = interaction.options.getString('message', false) ?? 'AFK...';
    const {id} = interaction.user;
    const isAFK = this.shiori.afkUsers.get(id);
    if (isAFK) {
      await AFKModel.updateOne(
        {
          _id: isAFK._id,
        },
        {
          $set: {
            message,
            updatedAt: new Date(),
          },
        }
      );
    } else {
      const afkUser = new AFKModel(id, message);
      await afkUser.save();
      this.shiori.afkUsers.set(id, afkUser.toJSON());
    }
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('Blue')
          .setTitle(
            isAFK
              ? 'I have updated your AFK note!~'
              : 'I have marked you as AFK!~'
          )
          .setDescription(
            `I will show this message when someone pings you: ${message}`
          ),
      ],
    });
  }
}
