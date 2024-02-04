import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuITCommand from '../structures/WaifuITCommand';
import {CommandType} from '../types';

export default class Sleepy extends WaifuITCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `${user} is feeling sleepy!`,
        cooldown: 1500,
        description: 'Express your sleepy-ness!~',
        endpoint: 'sleepy',
        fallbackGIFs: [],
        hidden: false,
        name: 'sleepy',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
