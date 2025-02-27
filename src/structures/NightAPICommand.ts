import {Logger} from 'pino';

import request from '../lib/request';
import {INightAPIResponse, IWaifuCommandData} from '../types';
import Shiori from './Shiori';
import WaifuCommand from './WaifuCommand';

export default class NightAPICommand extends WaifuCommand {
  public constructor(shiori: Shiori, data: IWaifuCommandData, logger: Logger) {
    super(shiori, data, logger);
    this.url = `https://api.night-api.com/${data.endpoint}`;
  }

  public async getEmbedUrl() {
    const {content} = await request<INightAPIResponse>(this.url, {
      headers: {
        Authorization: `${Bun.env['SHIORI_NIGHT_API_KEY']}`,
      },
    }).catch(e => {
      this.logger.error(
        e,
        `Shiori ran into an error while fetching an image from endpoint: ${this.url}:`
      );
      return {
        content: {
          url: this.fallbackGIFs[
            Math.floor(Math.random() * this.fallbackGIFs.length)
          ],
        },
      };
    });
    return content.url;
  }
}
