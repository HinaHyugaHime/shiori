import {
  ActivityType,
  AllowedMentionsTypes,
  Client,
  Collection,
  GatewayIntentBits,
  Options,
  PresenceUpdateStatus,
} from 'discord.js';

import Marriage from '../models/Marriage';
import {AliasCollection, CommandCollection, MarriageCollection} from '../types';
import BaseCommand from './BaseCommand';

export default class Shiori extends Client {
  public aliases: AliasCollection = new Collection();
  public commands: CommandCollection = new Collection();
  public marriages: MarriageCollection = new Collection();
  public sankakuAuthToken: string;

  public constructor() {
    super({
      allowedMentions: {
        parse: [AllowedMentionsTypes.User],
      },
      intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds],
      makeCache: Options.cacheWithLimits({
        ...Options.DefaultMakeCacheSettings,
        ReactionManager: 0,
      }),
      presence: {
        activities: [
          {
            name: 'with your heart!~',
            type: ActivityType.Playing,
          },
        ],
        status: PresenceUpdateStatus.Online,
      },
    });
    this.sankakuAuthToken = '';
  }

  public async cacheMarriages() {
    const marriages = await Marriage.find({
      deleted: false,
    });
    marriages.forEach(marriage => {
      this.marriages.set(marriage.couples[0], {
        ...marriage,
        partner: marriage.couples[1],
      });
      this.marriages.set(marriage.couples[1], {
        ...marriage,
        partner: marriage.couples[0],
      });
    });
  }

  public registerCommand(command: BaseCommand) {
    this.commands.set(command.name, command);
    command.aliases.forEach(alias => this.aliases.set(alias, command.name));
  }
}
