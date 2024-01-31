import {Logger} from 'pino';

import GIFCommand from '../structures/GIFCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Clap extends GIFCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          targetUser
            ? `${user} is clapping for ${targetUser}!`
            : `${user} is clapping!`,
        cooldown: 1500,
        description: 'Clap your hands!~',
        fallbackGIFs: ['https://i.imgur.com/ncQyDHe.gif'],
        hidden: false,
        name: 'clap',
        targetRequired: false,
        targetRequiredMessage: 'The user you want to clap for',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
