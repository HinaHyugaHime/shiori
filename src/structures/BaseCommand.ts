import {
  ChatInputCommandInteraction,
  Collection,
  EmbedBuilder,
  SlashCommandBuilder,
  inlineCode,
} from 'discord.js';
import {Logger} from 'pino';
import prettyMilliseconds from 'pretty-ms';

import {CommandType, CooldownCollection, ICommandData} from '../types';
import Shiori from './Shiori';

export default abstract class BaseCommand {
  public aliases: string[];
  public cooldown: number;
  public cooldowns: CooldownCollection;
  public description: string;
  public hidden: boolean;
  public logger: Logger;
  public name: string;
  public shiori: Shiori;
  public slashCommandData: SlashCommandBuilder;
  public type: CommandType;

  public constructor(shiori: Shiori, data: ICommandData, logger: Logger) {
    this.aliases = data.aliases;
    this.cooldown = data.cooldown;
    this.cooldowns = new Collection();
    this.description = data.description;
    this.hidden = data.hidden;
    this.logger = logger;
    this.name = data.name;
    this.shiori = shiori;
    this.slashCommandData = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .setNSFW(data.type === CommandType.NSFW);
    this.type = data.type;
  }
  public getHelpEmbed(): EmbedBuilder {
    return new EmbedBuilder()
      .setTitle(`Command: ${this.name}`)
      .setColor('Blue')
      .addFields([
        {
          name: 'Aliases:',
          value: this.aliases.map(x => inlineCode(x)).join(', ') || 'None',
        },
        {
          name: 'Cooldown:',
          value: prettyMilliseconds(this.cooldown),
        },
        {
          name: 'Description:',
          value: this.description,
        },
      ]);
  }
  public abstract run(interaction?: ChatInputCommandInteraction): unknown;
}
