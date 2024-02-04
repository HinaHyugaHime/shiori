import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuITCommand from '../structures/WaifuITCommand';
import {CommandType} from '../types';

export default class Dab extends WaifuITCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `${user} is dabbing!`,
        cooldown: 1500,
        description: 'flex your accomplishment by dabbing!~',
        endpoint: 'dab',
        fallbackGIFs: [],
        hidden: false,
        name: 'dab',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
