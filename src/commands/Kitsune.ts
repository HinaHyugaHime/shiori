import {Logger} from 'pino';

import PurrCommand from '../structures/PurrCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Kitsune extends PurrCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `Here's a kitsune image for you, ${user}!`,
        cooldown: 1500,
        description: 'Shows a random kitsune image',
        endpoint: 'img/sfw/kitsune/img',
        fallbackGIFs: [],
        hidden: false,
        name: 'kitsune',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
