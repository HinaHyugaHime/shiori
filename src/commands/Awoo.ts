import {Logger} from 'pino';

import Shiori from '../structures/Shiori';
import WaifuCommand from '../structures/WaifuCommand';
import {CommandType} from '../types';

export default class Awoo extends WaifuCommand {
  public constructor(shiori: Shiori, logger: Logger) {
    super(
      shiori,
      {
        aliases: [],
        contentGenerator: (user, targetUser) =>
          targetUser
            ? `${user} awoo'd at ${targetUser}!`
            : `${user} is awoo-ing!`,
        cooldown: 1500,
        description: 'Awoo randomly or at someone!~',
        endpoint: 'sfw/awoo',
        fallbackGIFs: [],
        hidden: false,
        name: 'awoo',
        targetRequired: false,
        targetRequiredMessage: 'The user to awoo at',
        type: CommandType.SFW,
      },
      logger
    );
  }
}
