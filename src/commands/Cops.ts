import {Logger} from 'pino';

import GIFCommand from '../structures/GIFCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Cops extends GIFCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          targetUser
            ? `${user} is calling the cops on ${targetUser}!`
            : `${user} is calling the cops!`,
        cooldown: 1500,
        description: 'Call cops on someone!~',
        fallbackGIFs: [
          'https://c.tenor.com/fQQpc2zxM4kAAAAd/tsukiko-calling.gif',
        ],
        hidden: false,
        name: 'cops',
        targetRequired: false,
        targetRequiredMessage: 'The user you want to calls the cops on',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
