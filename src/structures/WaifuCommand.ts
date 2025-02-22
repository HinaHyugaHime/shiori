import {Logger} from 'pino';

import request from '../lib/request';
import {IWaifuCommandData, IWaifuResponse} from '../types';
import GIFCommand from './GIFCommand';
import Shiori from './Shiori';

export default class WaifuCommand extends GIFCommand {
  public url: string;
  public constructor(shiori: Shiori, data: IWaifuCommandData, logger: Logger) {
    super(shiori, data, logger);
    this.fallbackGIFs = data.fallbackGIFs;
    this.url = `https://api.waifu.pics/${data.endpoint}`;
  }

  public async getEmbedUrl() {
    const {url} = await request<IWaifuResponse>(this.url).catch(e => {
      this.logger.error(
        e,
        `Shiori ran into an error while fetching an image from endpoint: ${this.url}:`
      );
      return {
        url: this.fallbackGIFs[
          Math.floor(Math.random() * this.fallbackGIFs.length)
        ],
      };
    });
    return url;
  }
}
