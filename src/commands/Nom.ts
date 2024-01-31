import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Nom extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          `${user} thinks ${targetUser} is food!`,
        cooldown: 1500,
        description: '...?',
        endpoint: 'sfw/nom',
        fallbackGIFs: [],
        hidden: false,
        name: 'nom',
        targetRequired: true,
        targetRequiredMessage: 'The user to nom',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
