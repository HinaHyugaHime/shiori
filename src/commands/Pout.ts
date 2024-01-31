import {Logger} from 'pino';

import GIFCommand from '../structures/GIFCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Pout extends GIFCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          targetUser
            ? `${user} is pouting at ${targetUser}!`
            : `${user} is pouting!`,
        cooldown: 1500,
        description: 'Pout at someone!~',
        fallbackGIFs: [
          'https://c.tenor.com/3EgO4ozQzp4AAAAC/anime-raphtalia.gif',
        ],
        hidden: false,
        name: 'pout',
        targetRequired: false,
        targetRequiredMessage: 'The user you want to pout at',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
