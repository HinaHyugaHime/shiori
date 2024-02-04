import {Logger} from 'pino';

import request from '../lib/request';
import {IPurrResponse, IWaifuCommandData} from '../types';
import Shiori from './Shiori';
import WaifuCommand from './WaifuCommand';

export default class PurrCommand extends WaifuCommand {
  public constructor(shiori: Shiori, data: IWaifuCommandData, logger: Logger) {
    super(shiori, data, logger);
    this.url = `https://purrbot.site/api/${data.endpoint}`;
  }

  public async getEmbedUrl() {
    const {link} = await request<IPurrResponse>(this.url).catch(e => {
      this.logger.error(
        e,
        `Shiori ran into an error while fetching an image from endpoint: ${this.url}:`
      );
      return {
        link: this.fallbackGIFs[
          Math.floor(Math.random() * this.fallbackGIFs.length)
        ],
      };
    });
    return link;
  }
}
