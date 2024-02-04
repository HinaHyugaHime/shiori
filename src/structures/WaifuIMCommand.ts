import {Logger} from 'pino';

import request from '../lib/request';
import {IWaifuCommandData, IWaifuIMResponse} from '../types';
import Shiori from './Shiori';
import WaifuCommand from './WaifuCommand';

export default class WaifuIMCommand extends WaifuCommand {
  public constructor(shiori: Shiori, data: IWaifuCommandData, logger: Logger) {
    super(shiori, data, logger);
    this.url = `https://api.waifu.im/search?included_tags=${data.endpoint}`;
  }

  public async getEmbedUrl() {
    const {images} = await request<IWaifuIMResponse>(this.url).catch(e => {
      this.logger.error(
        e,
        `Shiori ran into an error while fetching an image from endpoint: ${this.url}:`
      );
      return {
        images: [
          {
            url: this.fallbackGIFs[
              Math.floor(Math.random() * this.fallbackGIFs.length)
            ],
          },
        ],
      };
    });
    const {url} = images[Math.floor(Math.random() * images.length)];
    return url;
  }
}
