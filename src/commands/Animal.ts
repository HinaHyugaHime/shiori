import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  inlineCode,
  userMention,
} from 'discord.js';
import {Logger} from 'pino';

import request from '../lib/request';
import BaseCommand from '../structures/BaseCommand';
import Shiori from '../structures/Shiori';
import {CommandType, INightAPIResponse} from '../types';

export default class Animal extends BaseCommand {
  public apiMapping: Record<string, string>;
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        cooldown: 1500,
        description: 'Shows a random animal image',
        hidden: false,
        name: 'animal',
        type: CommandType.SFW,
      },
      logger
    );
    this.apiMapping = {
      cat: 'cat',
      dog: 'dog',
      fox: 'fox',
      giraffe: 'giraffe',
      hamster: 'hamster',
      kangaroo: 'kangaroo',
      leopard: 'leopard',
      lion: 'lion',
      lizard: 'lezard',
      monkey: 'singes',
      peacock: 'paon',
      quokka: 'quokka',
      wolf: 'wolf',
    };
    this.slashCommandData.addStringOption(option =>
      option
        .setDescription('The animal you want an image of')
        .setName('animal')
        .setRequired(true)
        .addChoices(
          {
            name: 'cat',
            value: 'cat',
          },
          {
            name: 'dog',
            value: 'dog',
          },
          {
            name: 'fox',
            value: 'fox',
          },
          {
            name: 'giraffe',
            value: 'giraffe',
          },
          {
            name: 'hamster',
            value: 'hamster',
          },
          {
            name: 'kangaroo',
            value: 'kangaroo',
          },
          {
            name: 'leopard',
            value: 'leopard',
          },
          {
            name: 'lion',
            value: 'lion',
          },
          {
            name: 'lizard',
            value: 'lizard',
          },
          {
            name: 'monkey',
            value: 'monkey',
          },
          {
            name: 'peacock',
            value: 'peacock',
          },
          {
            name: 'quokka',
            value: 'quokka',
          },
          {
            name: 'wolf',
            value: 'wolf',
          }
        )
    );
  }

  public getHelpEmbed() {
    return super.getHelpEmbed().addFields([
      {
        name: 'Usage:',
        value: `${inlineCode('/animal')} ${inlineCode('animal')}`,
      },
      {
        name: 'Example:',
        value: `${inlineCode('/animal')} ${inlineCode('cat')}`,
      },
    ]);
  }

  public async run(interaction: ChatInputCommandInteraction) {
    const animal = interaction.options.getString('animal', true);
    const endpoint = this.apiMapping[animal];
    if (!endpoint) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle('Invalid choice for animal')
            .setDescription(
              'Uh oh, unfortunately shiori does not know about that animal :/'
            )
            .setColor('Red'),
        ],
      });
    }
    try {
      const {content} = await request<INightAPIResponse>(
        `https://api.night-api.com/images/animals/${endpoint}`,
        {
          headers: {
            Authorization: `${Bun.env['SHIORI_NIGHT_API_KEY']}`,
          },
        }
      );
      interaction.reply({
        content: `Here's a ${animal} for you, ${userMention(interaction.user.id)}!`,
        embeds: [new EmbedBuilder().setImage(content.url).setColor('Blue')],
      });
    } catch (err) {
      this.logger.error(
        err,
        `Shiori ran into an error while trying to fetch an image from Night API for animal: ${animal} (${endpoint})`
      );
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle('Something went wrong')
            .setDescription(
              'Shiori ran into an error while finding images for that animal :/'
            )
            .setColor('Red'),
        ],
      });
    }
  }
}
