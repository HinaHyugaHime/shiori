import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Bite extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) => `${user} bit ${targetUser}!`,
        cooldown: 1500,
        description: 'Randomly bite someone!~',
        endpoint: 'sfw/bite',
        fallbackGIFs: [],
        hidden: false,
        name: 'bite',
        targetRequired: true,
        targetRequiredMessage: 'The user to bite',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
