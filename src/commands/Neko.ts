import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Neko extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `Here's a neko for you, ${user}!`,
        cooldown: 1500,
        description: 'Shows a random neko image',
        endpoint: 'sfw/neko',
        fallbackGIFs: [],
        hidden: false,
        name: 'neko',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
