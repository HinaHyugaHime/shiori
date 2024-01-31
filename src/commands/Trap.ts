import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class TrapNSFW extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `Here's a trap for you, ${user}!`,
        cooldown: 1500,
        description: 'Shows a random trap (nsfw) image',
        endpoint: 'nsfw/trap',
        fallbackGIFs: [],
        hidden: false,
        name: 'trap',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.NSFW,
      },
      logger
    );
  }
}
