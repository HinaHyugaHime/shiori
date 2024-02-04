import {Logger} from 'pino';

import PurrCommand from '../structures/PurrCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Lay extends PurrCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `${user} is laying down!`,
        cooldown: 1500,
        description: 'lay down, relax!',
        endpoint: 'img/sfw/lay/gif',
        fallbackGIFs: [],
        hidden: false,
        name: 'lay',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
