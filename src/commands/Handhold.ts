import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Handhold extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: ['hh'],
        contentGenerator: (user, targetUser) =>
          `${user} is holding hands with ${targetUser}!`,
        cooldown: 1500,
        description: 'Hold hands with someone!~',
        endpoint: 'sfw/handhold',
        fallbackGIFs: [],
        hidden: false,
        name: 'handhold',
        targetRequired: true,
        targetRequiredMessage: 'The user to hold hands with',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
