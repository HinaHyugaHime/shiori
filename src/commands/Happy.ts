import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Happy extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `${user} is happy!`,
        cooldown: 1500,
        description: 'Express your happiness!~',
        endpoint: 'sfw/happy',
        fallbackGIFs: [],
        hidden: false,
        name: 'happy',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
