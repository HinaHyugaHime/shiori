import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Kick extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) => `${user} kicked ${targetUser}!`,
        cooldown: 1500,
        description: 'Kick someone (as a joke)!~',
        endpoint: 'sfw/kick',
        fallbackGIFs: [],
        hidden: false,
        name: 'kick',
        targetRequired: true,
        targetRequiredMessage: 'The user to kick',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
