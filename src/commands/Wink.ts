import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Wink extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          targetUser ? `${user} winked at ${targetUser}!` : `${user} winked!`,
        cooldown: 1500,
        description: 'Wink (at someone?)!~',
        endpoint: 'sfw/wink',
        fallbackGIFs: [],
        hidden: false,
        name: 'wink',
        targetRequired: false,
        targetRequiredMessage: 'The user to wink at',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
