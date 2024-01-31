import {Events} from 'discord.js';
import {Logger} from 'pino';

import {cacheAuthToken} from '../lib/sankaku';
import BaseEvent from '../structures/BaseEvent';
import Shiori from '../structures/Shiori';

export default class ClientReady extends BaseEvent {
  public constructor(shiori: Shiori, logger: Logger) {
    super(shiori, Events.ClientReady, logger);
  }

  public async cronJob() {
    try {
      const res = await cacheAuthToken();
      if (res.access_token) {
        this.logger.info('Successfully refreshed Sankaku Auth Token');
        this.shiori.sankakuAuthToken = res.access_token;
      }
    } catch (err) {
      this.logger.error(
        err,
        'Something went wrong while refreshing Sankaku Auth Token'
      );
    }
  }

  public async run() {
    this.logger.info('Shiori is ready!');
    this.logger.info(`Logged in as ${this.shiori.user!.tag}!`);
    this.cronJob();
    this.logger.info('Starting Sankaku Auth Token refresh cron');
    setInterval(() => {
      this.cronJob();
    }, 3600000);
  }
}
