import {Events} from 'discord.js';
import {Logger} from 'pino';

import Shiori from './Shiori';

export default abstract class BaseEvent {
  public logger: Logger;
  public name: string;
  public shiori: Shiori;
  public constructor(shiori: Shiori, name: Events, logger: Logger) {
    this.name = name;
    this.logger = logger;
    this.shiori = shiori;
  }

  public abstract run(...args: unknown[]): Promise<unknown>;
}
