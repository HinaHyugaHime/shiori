import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Smile extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          targetUser ? `${user} smiled at ${targetUser}!` : `${user} smiled!`,
        cooldown: 1500,
        description: 'Smile (at someone?)!~',
        endpoint: 'sfw/smile',
        fallbackGIFs: [],
        hidden: false,
        name: 'smile',
        targetRequired: false,
        targetRequiredMessage: 'The user to smile at',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
