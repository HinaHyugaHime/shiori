import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Wave extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          `${user} waved at ${targetUser}!`,
        cooldown: 1500,
        description: 'Wave at someone!~',
        endpoint: 'sfw/wave',
        fallbackGIFs: [],
        hidden: false,
        name: 'wave',
        targetRequired: true,
        targetRequiredMessage: 'The user to wave at',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
