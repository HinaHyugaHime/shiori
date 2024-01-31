import {Logger} from 'pino';

import GIFCommand from '../structures/GIFCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Confused extends GIFCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `$${user} is confused!`,
        cooldown: 1500,
        description: 'Express your confusion',
        fallbackGIFs: [
          'https://c.tenor.com/H2GvCmfShZEAAAAC/menhera-chan.gif',
          'https://c.tenor.com/lRwY8mEskrEAAAAC/anime-eating-menhera-chan.gif',
        ],
        hidden: false,
        name: 'confused',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
