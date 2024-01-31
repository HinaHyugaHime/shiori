import {Logger} from 'pino';

import GIFCommand from '../structures/GIFCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Love extends GIFCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          `${user} is expressing love towards ${targetUser}!`,
        cooldown: 1500,
        description: 'Express your Love (for someone?)!~',
        fallbackGIFs: [
          'https://c.tenor.com/1q0khpZbzUcAAAAC/menhera-heart.gif',
        ],
        hidden: false,
        name: 'love',
        targetRequired: false,
        targetRequiredMessage: 'The user you want to express your love to',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
