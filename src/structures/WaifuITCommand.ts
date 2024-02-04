import {Logger} from 'pino';

import request from '../lib/request';
import {IWaifuCommandData, IWaifuITResponse} from '../types';
import Shiori from './Shiori';
import WaifuCommand from './WaifuCommand';

export default class WaifuITCommand extends WaifuCommand {
  public constructor(shiori: Shiori, data: IWaifuCommandData, logger: Logger) {
    super(shiori, data, logger);
    this.url = `https://waifu.it/api/v4/${data.endpoint}`;
  }

  public async getEmbedUrl() {
    const {url} = await request<IWaifuITResponse>(this.url, {
      headers: {
        Authorization: `${Bun.env['SHIORI_WAIFU_IT_API_KEY']}`,
      },
    }).catch(e => {
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
    return url.endsWith('.gif') ? url : `${url}.gif`;
  }
}
