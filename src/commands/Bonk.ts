import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Bonk extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) => `${user} bonked ${targetUser}!`,
        cooldown: 1500,
        description: 'Bonk someone!~',
        endpoint: 'sfw/bonk',
        fallbackGIFs: [],
        hidden: false,
        name: 'bonk',
        targetRequired: true,
        targetRequiredMessage: 'The user to bonk',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
