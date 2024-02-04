import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuITCommand from '../structures/WaifuITCommand';
import {CommandType} from '../types';

export default class Die extends WaifuITCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `${user} just died!`,
        cooldown: 1500,
        description: 'Express your pain',
        endpoint: 'die',
        fallbackGIFs: [],
        hidden: false,
        name: 'die',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
