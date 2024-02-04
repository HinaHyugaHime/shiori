import {Logger} from 'pino';

import PurrCommand from '../structures/PurrCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Yaoi extends PurrCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `Here's an yaoi image for you, ${user}!`,
        cooldown: 1500,
        description: 'Shows a random yaoi image',
        endpoint: 'img/nsfw/yaoi/gif',
        fallbackGIFs: [],
        hidden: false,
        name: 'yaoi',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.NSFW,
      },
      logger
    );
  }
}
