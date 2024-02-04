import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuITCommand from '../structures/WaifuITCommand';
import {CommandType} from '../types';

export default class Hi extends WaifuITCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `${user} is waving hi!`,
        cooldown: 1500,
        description: 'Say hi to the chat!',
        endpoint: 'hi',
        fallbackGIFs: [],
        hidden: false,
        name: 'hi',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
