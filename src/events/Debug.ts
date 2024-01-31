import {Events} from 'discord.js';
import {Logger} from 'pino';

import BaseEvent from '../structures/BaseEvent';
import Shiori from '../structures/Shiori';

export default class Debug extends BaseEvent {
  public constructor(shiori: Shiori, logger: Logger) {
    super(shiori, Events.Debug, logger);
  }

  public async run(message: unknown) {
    this.logger.debug(message);
  }
}
