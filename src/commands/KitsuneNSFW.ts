import {Logger} from 'pino';

import NightAPICommand from '../structures/NightAPICommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Kitsune extends NightAPICommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `Here's a kitsune image for you, ${user}!`,
        cooldown: 1500,
        description: 'Shows a random kitsune (nsfw) image',
        endpoint: 'images/nsfw/hkitsune',
        fallbackGIFs: [],
        hidden: false,
        name: 'kitsune-nsfw',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.NSFW,
      },
      logger
    );
  }
}
