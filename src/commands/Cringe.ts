import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Cringe extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          targetUser
            ? `${user} finds ${targetUser} cringe!`
            : `${user} feels cringe!`,
        cooldown: 1500,
        description: 'Show how cringe you feel or find someone!~',
        endpoint: 'sfw/cringe',
        fallbackGIFs: [],
        hidden: false,
        name: 'cringe',
        targetRequired: false,
        targetRequiredMessage: 'The user you find cringe',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
