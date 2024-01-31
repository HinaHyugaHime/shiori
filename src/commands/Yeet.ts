import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Yeet extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) => `${user} yeeted ${targetUser}!`,
        cooldown: 1500,
        description: 'Yeet someone (as a joke)!~',
        endpoint: 'sfw/yeet',
        fallbackGIFs: [],
        hidden: false,
        name: 'yeet',
        targetRequired: true,
        targetRequiredMessage: 'The user to yeet',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
