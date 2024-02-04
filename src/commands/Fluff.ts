import {Logger} from 'pino';

import PurrCommand from '../structures/PurrCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Fluff extends PurrCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `Here's a fluff image for you, ${user}!`,
        cooldown: 1500,
        description: 'Shows a random fluff image',
        endpoint: 'img/sfw/fluff/gif',
        fallbackGIFs: [],
        hidden: false,
        name: 'fluff',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
