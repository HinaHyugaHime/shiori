import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Slap extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          `${user} slapped ${targetUser}!`,
        cooldown: 1500,
        description: 'Slap someone (as a joke)!~',
        endpoint: 'sfw/slap',
        fallbackGIFs: [],
        hidden: false,
        name: 'slap',
        targetRequired: true,
        targetRequiredMessage: 'The user to slap',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
