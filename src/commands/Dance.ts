import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Dance extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          targetUser
            ? `${user} is dancing with ${targetUser}!`
            : `${user} is dancing!`,
        cooldown: 1500,
        description: 'Dance to the party!~',
        endpoint: 'sfw/dance',
        fallbackGIFs: [],
        hidden: false,
        name: 'dance',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
