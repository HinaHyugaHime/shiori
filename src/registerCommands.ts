import {
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from 'discord.js';
import {readdirSync} from 'node:fs';
import {join} from 'node:path';
import {Logger} from 'pino';

import isProd from './lib/isProd';
import logger from './lib/logger';
import BaseCommand from './structures/BaseCommand';
import Shiori from './structures/Shiori';

if (!process.env.SHIORI_BOT_TOKEN) {
  logger.error('No token provided');
  process.exit(1);
}

logger.info('Preparing to register commands...');

const shiori = new Shiori();
const commandsDir = join(import.meta.dir, 'commands');
const commandFiles = readdirSync(commandsDir)
  .filter(file => file.endsWith('.ts'))
  .filter(file => file !== 'Help.ts');

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

await Promise.all(
  commandFiles.map(async file => {
    logger.info(`Loading command ${file}`);
    const {
      default: ShioriCommand,
    }: {default: new (shiori: Shiori, logger: Logger) => BaseCommand} =
      await import(join(commandsDir, file));
    const command = new ShioriCommand(shiori, logger);
    commands.push(command.slashCommandData.toJSON());
    command.aliases.forEach(alias =>
      commands.push(command.slashCommandData.setName(alias).toJSON())
    );
    shiori.registerCommand(command);
    logger.info(
      `Loaded command: ${file} as ${command.name} with aliases: ${
        command.aliases.join(', ') || 'None'
      }`
    );
  })
);

logger.info('Loading command help command...');
const {
  default: ShioriCommand,
}: {default: new (shiori: Shiori, logger: Logger) => BaseCommand} =
  await import(join(commandsDir, 'Help.ts'));
const command = new ShioriCommand(shiori, logger);
commands.push(command.slashCommandData.toJSON());
command.aliases.forEach(alias =>
  commands.push(command.slashCommandData.setName(alias).toJSON())
);
logger.info(
  `Loaded command: Help.ts as ${command.name} with aliases: ${
    command.aliases.join(', ') || 'None'
  }`
);

const rest = new REST().setToken(process.env.SHIORI_BOT_TOKEN);

try {
  logger.info('Started refreshing application (/) commands.');
  if (!isProd) {
    await rest.put(
      Routes.applicationGuildCommands(
        `${process.env['SHIORI_BOT_CLIENT_ID']}`,
        `${process.env['SHIORI_DEBUG_GUILD_ID']}`
      ),
      {
        body: commands,
      }
    );
  } else {
    await rest.put(
      Routes.applicationGuildCommands(
        `${process.env['SHIORI_BOT_CLIENT_ID']}`,
        `${process.env['SHIORI_DEBUG_GUILD_ID']}`
      ),
      {
        body: [],
      }
    );
    await rest.put(
      Routes.applicationCommands(`${process.env['SHIORI_BOT_CLIENT_ID']}`),
      {
        body: commands,
      }
    );
  }
  logger.info('Successfully reloaded application (/) commands.');
} catch (err) {
  logger.error(err);
}

process.exit(0);
