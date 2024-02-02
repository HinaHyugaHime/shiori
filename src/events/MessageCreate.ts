import {Events, Message, inlineCode, userMention} from 'discord.js';
import {Logger} from 'pino';
import prettyMilliseconds from 'pretty-ms';

import isDebug from '../lib/isDebug';
import AFK from '../models/AFK';
import BaseEvent from '../structures/BaseEvent';
import Shiori from '../structures/Shiori';

export default class MessageCreate extends BaseEvent {
  public constructor(shiori: Shiori, logger: Logger) {
    super(shiori, Events.MessageCreate, logger);
  }

  public async run(msg: Message) {
    if (msg.author.bot) {
      return;
    }
    if (isDebug && msg.guild?.id !== Bun.env['SHIORI_DEBUG_GUILD_ID']) {
      return;
    }
    const afkUsers = msg.mentions.users.filter(x =>
      this.shiori.afkUsers.has(x.id)
    );
    if (afkUsers.size) {
      try {
        await Promise.all(
          afkUsers.map(user => {
            const {message} = this.shiori.afkUsers.get(user.id)!;
            return msg.reply(
              `Heyyy, ${user.username} is AFK! They left you a note though: ${message}`
            );
          })
        );
      } catch (err) {
        this.logger.error(
          err,
          'Shiori ran into an error while trying to respond to an AFK user tagged message'
        );
      }
    }
    const isAFK = this.shiori.afkUsers.get(msg.author.id);
    if (!isAFK) {
      return;
    }
    try {
      await AFK.updateOne(
        {
          _id: isAFK._id,
        },
        {
          $set: {
            deleted: true,
            updatedAt: new Date(),
          },
        }
      );
      this.shiori.afkUsers.delete(isAFK.user);
      return msg.channel.send(
        `Heyyy ${userMention(isAFK.user)}, Welcome back from your ${inlineCode(prettyMilliseconds(new Date().getTime() - new Date(isAFK.createdAt).getTime()))} long AFK session!~`
      );
    } catch (err) {
      this.logger.error(
        err,
        'Shiori ran into an error while removing AFK status for an user',
        msg
      );
    }
  }
}
