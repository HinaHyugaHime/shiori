import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuITCommand from '../structures/WaifuITCommand';
import {CommandType} from '../types';

export default class Running extends WaifuITCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `${user} is running away!`,
        cooldown: 1500,
        description: 'run away from the chat!',
        endpoint: 'run',
        fallbackGIFs: [],
        hidden: false,
        name: 'run',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
