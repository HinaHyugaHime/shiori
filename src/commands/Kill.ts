import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Kill extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) => `${user} killed ${targetUser}!`,
        cooldown: 1500,
        description: 'Kill someone (as a joke)!~',
        endpoint: 'sfw/kill',
        fallbackGIFs: [],
        hidden: false,
        name: 'kill',
        targetRequired: true,
        targetRequiredMessage: 'The user you want to kill',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
