import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Poke extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, target) => `${user} is poking ${target}!`,
        cooldown: 1500,
        description: 'Poke someone!~',
        endpoint: 'sfw/poke',
        fallbackGIFs: [],
        hidden: false,
        name: 'poke',
        targetRequired: true,
        targetRequiredMessage: 'The user to poke',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
