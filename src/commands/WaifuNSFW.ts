import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class WaifuNSFW extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `Here's a waifu for you, ${user}!`,
        cooldown: 1500,
        description: 'Shows a random waifu (nsfw) image',
        endpoint: 'nsfw/waifu',
        fallbackGIFs: [],
        hidden: false,
        name: 'w-nsfw',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.NSFW,
      },
      logger
    );
  }
}
