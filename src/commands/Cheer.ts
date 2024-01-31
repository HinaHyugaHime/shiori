import {Logger} from 'pino';

import GIFCommand from '../structures/GIFCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Cheer extends GIFCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          `${user} is cheering for ${targetUser}!`,
        cooldown: 1500,
        description: 'Cheer for someone!~',
        fallbackGIFs: ['https://c.tenor.com/SpT5l-6LQtAAAAAC/anime-happy.gif'],
        hidden: false,
        name: 'cheer',
        targetRequired: true,
        targetRequiredMessage: 'The user you want to cheer for',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
