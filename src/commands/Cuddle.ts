import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Cuddle extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          `${user} cuddled ${targetUser}!`,
        cooldown: 1500,
        description: 'Shows a random cuddle image',
        endpoint: 'sfw/cuddle',
        fallbackGIFs: [],
        hidden: false,
        name: 'cuddle',
        targetRequired: true,
        targetRequiredMessage: 'The user to cuddle',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
