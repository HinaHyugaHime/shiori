import {Logger} from 'pino';

import PurrCommand from '../structures/PurrCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Holo extends PurrCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `Here's a holo image for you, ${user}!`,
        cooldown: 1500,
        description: 'Shows a random holo image',
        endpoint: 'img/sfw/holo/img',
        fallbackGIFs: [],
        hidden: false,
        name: 'holo',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
