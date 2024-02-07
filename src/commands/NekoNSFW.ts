import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class NekoNSFW extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `Here's a neko for you, ${user}!`,
        cooldown: 1500,
        description: 'Shows a random neko (nsfw) image',
        endpoint: 'nsfw/neko',
        fallbackGIFs: [],
        hidden: false,
        name: 'n-nsfw',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.NSFW,
      },
      logger
    );
  }
}
