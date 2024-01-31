import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Kiss extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          `${user} is kissing ${targetUser}!`,
        cooldown: 1500,
        description: 'Kiss someone!~',
        endpoint: 'sfw/kiss',
        fallbackGIFs: [],
        hidden: false,
        name: 'kiss',
        targetRequired: true,
        targetRequiredMessage: 'The user to kiss',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
