import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Shinobu extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `Here's a shinobu for you, ${user}!`,
        cooldown: 1500,
        description: 'Shows a random shinobu image',
        endpoint: 'sfw/shinobu',
        fallbackGIFs: [],
        hidden: false,
        name: 'shinobu',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
