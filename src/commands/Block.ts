import {Logger} from 'pino';

import GIFCommand from '../structures/GIFCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Block extends GIFCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          `${user} wants to block ${targetUser}!`,
        cooldown: 1500,
        description: 'Express your disapproval of someone',
        fallbackGIFs: [
          'https://c.tenor.com/JcLzO5HSm1gAAAAC/block-blocked.gif',
        ],
        hidden: false,
        name: 'block',
        targetRequired: true,
        targetRequiredMessage: 'The user you want to block',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
