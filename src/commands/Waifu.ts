import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Waifu extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `Here's a waifu for you, ${user}!`,
        cooldown: 1500,
        description: 'Shows a random waifu image',
        endpoint: 'sfw/waifu',
        fallbackGIFs: [],
        hidden: false,
        name: 'waifu',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
