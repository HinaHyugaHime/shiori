import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Megumin extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: ['megu'],
        contentGenerator: user => `Here's a megumin for you, ${user}!`,
        cooldown: 1500,
        description: 'Shows a random megumin image',
        endpoint: 'sfw/megumin',
        fallbackGIFs: [],
        hidden: false,
        name: 'megumin',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
