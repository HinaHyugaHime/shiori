import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class NekoNSFW extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          `${user} is giving ${targetUser} a blowjob`,
        cooldown: 1500,
        description: 'Blow someone!~',
        endpoint: 'nsfw/blowjob',
        fallbackGIFs: [],
        hidden: false,
        name: 'bj',
        targetRequired: true,
        targetRequiredMessage: 'The user to blow off',
        type: CommandType.NSFW,
      },
      logger
    );
  }
}
