import {Logger} from 'pino';

import PurrCommand from '../structures/PurrCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Okami extends PurrCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `Here's an okami image for you, ${user}!`,
        cooldown: 1500,
        description: 'Shows a random okami image',
        endpoint: 'img/sfw/okami/img',
        fallbackGIFs: [],
        hidden: false,
        name: 'okami',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
