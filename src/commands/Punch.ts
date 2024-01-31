import {Logger} from 'pino';

import GIFCommand from '../structures/GIFCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Punch extends GIFCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          `${user} is punching ${targetUser}!`,
        cooldown: 1500,
        description: 'Punch someone (as a joke)!?',
        fallbackGIFs: [
          'https://imgur.com/7eibSgA.gif',
          'https://c.tenor.com/UH8Jnl1W3CYAAAAC/anime-punch-anime.gif',
          'https://c.tenor.com/EdV_frZ4e_QAAAAC/anime-naruto.gif',
          'https://c.tenor.com/SwMgGqBirvcAAAAC/saki-saki-kanojo-mo-kanojo.gif',
          'https://c.tenor.com/EvBn8m3xR1cAAAAC/toradora-punch.gif',
          'https://c.tenor.com/sgzZFnBVXCMAAAAC/one-punch-man-kick.gif',
        ],
        hidden: false,
        name: 'punch',
        targetRequired: true,
        targetRequiredMessage: 'The user you want to punch',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
