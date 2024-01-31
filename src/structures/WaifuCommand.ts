import {Logger} from 'pino';

import request from '../lib/request';
import {IWaifuCommandData, IWaifuResponse} from '../types';
import GIFCommand from './GIFCommand';
import Shiori from './Shiori';

export default class WaifuCommand extends GIFCommand {
  private endpoint: string;
  public constructor(shiori: Shiori, data: IWaifuCommandData, logger: Logger) {
    super(shiori, data, logger);
    this.endpoint = data.endpoint;
    this.fallbackGIFs = data.fallbackGIFs;
  }

  public async getEmbedUrl() {
    const {url} = await request<IWaifuResponse>(
      `https://api.waifu.pics/${this.endpoint}`
    ).catch(e => {
      this.logger.error(
        e,
        `Shiori ran into an error while fetching waifu image from endpoint: ${this.endpoint}:`
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
