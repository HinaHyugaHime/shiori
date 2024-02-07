import {Logger} from 'pino';

import GIFCommand from '../structures/GIFCommand';
import Shiori from '../structures/Shiori';
import {CommandType} from '../types';

export default class Wag extends GIFCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: user => `${user} is wagging!`,
        cooldown: 1500,
        description: 'wag your tail in excitement!~',
        fallbackGIFs: [
          'https://media1.tenor.com/m/_SHZ8ZyLYL8AAAAC/flirty-flirt.gif',
          'https://media1.tenor.com/m/2oDLBdF_e9oAAAAC/nyhzumi-nyh.gif',
          'https://media1.tenor.com/m/2Up_E7YqMoYAAAAC/helltaker-modeus.gif',
          'https://media1.tenor.com/m/AEQVyidan3AAAAAd/kon-tokyo-ravens.gif',
          'https://media1.tenor.com/m/aqrVj-YBUucAAAAC/shino-wag.gif',
          'https://media1.tenor.com/m/CfD-J03i9AQAAAAd/ryuki-ryukitsumi.gif',
          'https://media1.tenor.com/m/cN7u8aWXKbcAAAAC/cat-anime.gif',
          'https://media1.tenor.com/m/CqZZfYNz_mgAAAAC/senko-san-anime.gif',
          'https://media1.tenor.com/m/hyNUJFzcOZcAAAAC/tokyo-ravens-cute.gif',
          'https://media1.tenor.com/m/ICV1nFqqx40AAAAC/murenase-lanka.gif',
          'https://media1.tenor.com/m/jdzqlPwF_8kAAAAC/anime-hearts.gif',
          'https://media1.tenor.com/m/JF8txHAE_s0AAAAC/laina-spice-and-wolf.gif',
          'https://media1.tenor.com/m/jqnbSlE62aAAAAAC/anime-cute.gif',
          'https://media1.tenor.com/m/lAfLMj3TnCYAAAAC/noela-fox-girl.gif',
          'https://media1.tenor.com/m/Ng6cYD1wk9YAAAAC/paw-sparkly-eyes.gif',
          'https://media1.tenor.com/m/nrcW9pTwu-oAAAAC/vtuber-foxplushy.gif',
          'https://media1.tenor.com/m/SAGYWHWsboQAAAAC/fox-femboy.gif',
          'https://media1.tenor.com/m/tUTFNxmoOmcAAAAC/holo-spice.gif',
          'https://media1.tenor.com/m/ViZ-8eg17mQAAAAC/anime-wag.gif',
          'https://media1.tenor.com/m/XrHbh9EH6sIAAAAC/neko-anime.gif',
        ],
        hidden: false,
        name: 'wag',
        targetRequired: false,
        targetRequiredMessage: '',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
