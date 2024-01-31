import {Logger} from 'pino';

import GIFCommand from '../structures/GIFCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Disgust extends GIFCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          targetUser
            ? `${user} finds ${targetUser} disgusting!`
            : `${user} is feeling disgusting!`,
        cooldown: 1500,
        description: 'Express your disgust',
        fallbackGIFs: [
          'https://c.tenor.com/1opLl5UEkR4AAAAC/lamy-stare-anime-stare.gif',
          'https://c.tenor.com/7dWlqDyO8wYAAAAC/anime-angry.gif',
          'https://c.tenor.com/YniEhuPth4UAAAAC/kyoukai-no-kanata-nase.gif',
        ],
        hidden: false,
        name: 'disgust',
        targetRequired: false,
        targetRequiredMessage: 'The user you find disgusting',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
