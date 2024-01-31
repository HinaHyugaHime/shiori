import {Logger} from 'pino';

import GIFCommand from '../structures/GIFCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Tease extends GIFCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          `${user} is teasing ${targetUser}!`,
        cooldown: 1500,
        description: 'Tease someone!~',
        fallbackGIFs: ['https://c.tenor.com/o1Q3rXQlX8kAAAAC/shy-menhera.gif'],
        hidden: false,
        name: 'tease',
        targetRequired: true,
        targetRequiredMessage: 'The user you want to tease',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
