import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Highfive extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          `${user} is highfiving ${targetUser}!`,
        cooldown: 1500,
        description: 'Highfive someone!~',
        endpoint: 'sfw/highfive',
        fallbackGIFs: [],
        hidden: false,
        name: 'highfive',
        targetRequired: true,
        targetRequiredMessage: 'The user to highfive',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
