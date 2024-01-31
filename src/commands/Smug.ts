import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Smug extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          targetUser
            ? `${user} is smugging about ${targetUser}!`
            : `${user} is smugging!`,
        cooldown: 1500,
        description: 'Be smug about something or at someone',
        endpoint: 'sfw/smug',
        fallbackGIFs: [],
        hidden: false,
        name: 'smug',
        targetRequired: false,
        targetRequiredMessage: 'The user to smug at',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
