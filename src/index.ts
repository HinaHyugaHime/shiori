import {EmbedBuilder} from 'discord.js';
import {Elysia, t} from 'elysia';
import {readdirSync} from 'node:fs';
import {join} from 'node:path';
import {Logger} from 'pino';

import logger from './lib/logger';
import webhookClient from './lib/webhookClient';
import BaseCommand from './structures/BaseCommand';
import BaseEvent from './structures/BaseEvent';
import Shiori from './structures/Shiori';

logger.info('Starting Shiori...');
const shiori = new Shiori();
logger.info('Logging in...');

const hasPort = process.env['SHIORI_HTTP_SERVER_PORT'] ?? process.env['PORT'];

if (hasPort) {
  new Elysia()
    .get(
      '/',
      () => {
        const latency = shiori.ws.ping ?? 0;
        if (process.env['SHIORI_DISCORD_DEBUG_WEBHOOK'] && !latency) {
          webhookClient.send({
            content: '',
            embeds: [
              new EmbedBuilder()
                .setColor('Red')
                .setDescription(
                  "Shiori's health check endpoint was hit, but Shiori's discord latency could not be determined, is Shiori offline?"
                )
                .setTitle('Shiori possibly offline'),
            ],
            username: 'Shiori Webhook Debug',
          });
        }
        return {
          latency,
          msg: latency
            ? "Shiori and Shiori's webserver are online!"
            : "Shiori's webserver is online, but Shiori seems to be offline :/",
          success: true,
          uptime: Bun.nanoseconds(),
        };
      },
      {
        response: t.Object({
          latency: t.Number(),
          msg: t.String(),
          success: t.Boolean(),
          uptime: t.Number(),
        }),
      }
    )
    .listen(parseInt(hasPort, 10));
}

const eventsDir = join(import.meta.dir, 'events');
const commandsDir = join(import.meta.dir, 'commands');

const eventFiles = readdirSync(eventsDir).filter(file => file.endsWith('.ts'));
const commandFiles = readdirSync(commandsDir).filter(file =>
  file.endsWith('.ts')
);

logger.info('Caching marriages...');
shiori
  .cacheMarriages()
  .then(() => logger.info('Successfully cached marriages'))
  .catch(err => logger.error(err, 'Error while caching marriages'));

shiori
  .cacheAFKUsers()
  .then(() => logger.info('Successfully cached afk users'))
  .catch(err => logger.error(err, 'Error while caching afk users'));

await Promise.all(
  eventFiles.map(async file => {
    logger.info(`Loading event: ${file}`);
    const {
      default: ShioriEvent,
    }: {default: new (shiori: Shiori, logger: Logger) => BaseEvent} =
      await import(join(eventsDir, file));
    const event = new ShioriEvent(shiori, logger);
    shiori.on(event.name, (...args: unknown[]) => {
      event
        .run(...args)
        .catch(err =>
          logger.error(err, `Event: ${event.name} threw an exception`, event)
        );
    });
    logger.info(`Loaded event: ${file} as ${event.name}`);
  })
);

await Promise.all(
  commandFiles.map(async file => {
    logger.info(`Loading command ${file}`);
    const {
      default: ShioriCommand,
    }: {
      default: new (shiori: Shiori, logger: Logger) => BaseCommand;
    } = await import(join(commandsDir, file));
    const command = new ShioriCommand(shiori, logger);
    shiori.registerCommand(command);
    logger.info(
      `Loaded command: ${file} as ${command.name} with aliases: ${
        command.aliases.join(', ') || 'None'
      }`
    );
  })
);

try {
  await shiori.login(process.env.SHIORI_BOT_TOKEN);
} catch (err) {
  logger.error(err);
  process.exit(1);
}
