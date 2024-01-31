import {Logger} from 'pino';

import GIFCommand from '../structures/GIFCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Sleep extends GIFCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          `${user} is telling ${targetUser} to sleep!`,
        cooldown: 1500,
        description: 'Tell someone to sleep',
        fallbackGIFs: [
          'https://c.tenor.com/my0V3TRCXIAAAAAd/shouko-go-to-sleep.gif',
        ],
        hidden: false,
        name: 'sleep',
        targetRequired: true,
        targetRequiredMessage: 'The user you want to sleep',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
