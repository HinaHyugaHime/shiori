import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Lick extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          `${user} is licking ${targetUser}!`,
        cooldown: 1500,
        description: 'Lick someone!~',
        endpoint: 'sfw/lick',
        fallbackGIFs: [],
        hidden: false,
        name: 'lick',
        targetRequired: true,
        targetRequiredMessage: 'The user to lick',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
