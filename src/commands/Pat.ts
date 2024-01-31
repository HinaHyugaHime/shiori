import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Pat extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, target) => `${user} is patting ${target}!`,
        cooldown: 1500,
        description: 'Pat someone!',
        endpoint: 'sfw/pat',
        fallbackGIFs: [],
        hidden: false,
        name: 'pat',
        targetRequired: true,
        targetRequiredMessage: 'The user to pat',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
