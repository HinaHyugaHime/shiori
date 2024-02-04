import {Logger} from 'pino';

import PurrCommand from '../structures/PurrCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Yuri extends PurrCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `Here's an yuri image for you, ${user}!`,
        cooldown: 1500,
        description: 'Shows a random yuri image',
        endpoint: 'img/nsfw/yuri/gif',
        fallbackGIFs: [],
        hidden: false,
        name: 'yuri',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.NSFW,
      },
      logger
    );
  }
}
