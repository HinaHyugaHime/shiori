import {Logger} from 'pino';

import GIFCommand from '../structures/GIFCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Peek extends GIFCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          targetUser
            ? `${user} is peeking at ${targetUser}!`
            : `${user} is peeking!`,
        cooldown: 1500,
        description: 'Peek at the chat or someone!~',
        fallbackGIFs: ['https://c.tenor.com/Vd4rlrnRjtoAAAAC/hiding.gif'],
        hidden: false,
        name: 'peek',
        targetRequired: false,
        targetRequiredMessage: 'The user you want to peek at',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
