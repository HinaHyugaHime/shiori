import {Logger} from 'pino';

import GIFCommand from '../structures/GIFCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Rage extends GIFCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          targetUser
            ? `${user} is raging at ${targetUser}!`
            : `${user} is raging!`,
        cooldown: 1500,
        description: 'Rage for someone!~',
        fallbackGIFs: [
          'https://c.tenor.com/ZjgygK098t4AAAAC/menhera-chan-confused.gif',
          'https://c.tenor.com/87aQv2hJFX8AAAAC/menhera-chan-angry.gif',
          'https://c.tenor.com/vvjlY-_iFFoAAAAC/menhera-chan.gif',
        ],
        hidden: false,
        name: 'rage',
        targetRequired: false,
        targetRequiredMessage: 'The user you want to rage at',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
