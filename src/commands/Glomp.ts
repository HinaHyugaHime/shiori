import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Glomp extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          `${user} glomped ${targetUser}!`,
        cooldown: 1500,
        description: 'Glomp someone!~',
        endpoint: 'sfw/glomp',
        fallbackGIFs: [],
        hidden: false,
        name: 'glomp',
        targetRequired: true,
        targetRequiredMessage: 'The user to glomp',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
