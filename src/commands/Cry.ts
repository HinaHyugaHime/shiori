import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Cry extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          targetUser
            ? `${user} is crying because of ${targetUser}!`
            : `${user} is crying!`,
        cooldown: 1500,
        description: 'Express your sadness',
        endpoint: 'sfw/cry',
        fallbackGIFs: [],
        hidden: false,
        name: 'cry',
        targetRequired: false,
        targetRequiredMessage: 'The user who made you cry',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
