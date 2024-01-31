import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Hug extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          `${user} is hugging ${targetUser}!`,
        cooldown: 1500,
        description: 'Hug someone!~',
        endpoint: 'sfw/hug',
        fallbackGIFs: [],
        hidden: false,
        name: 'hug',
        targetRequired: true,
        targetRequiredMessage: 'The user to hug',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
