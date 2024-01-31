import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Bully extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          `${user} is bullying ${targetUser}!`,
        cooldown: 1500,
        description: "Bully someone (as a joke, don't be a baka)!~",
        endpoint: 'sfw/bully',
        fallbackGIFs: [],
        hidden: false,
        name: 'bully',
        targetRequired: true,
        targetRequiredMessage: 'The user to bully',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
