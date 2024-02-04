import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuIMCommand from '../structures/WaifuIMCommand';
import {CommandType} from '../types';

export default class Ecchi extends WaifuIMCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `Here's an ecchi image for you, ${user}!`,
        cooldown: 1500,
        description: 'Shows a random ecchi (nsfw) image',
        endpoint: 'ecchi',
        fallbackGIFs: [],
        hidden: false,
        name: 'ecchi',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.NSFW,
      },
      logger
    );
  }
}
