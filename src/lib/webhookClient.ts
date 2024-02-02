import {WebhookClient} from 'discord.js';

const webhookClient = new WebhookClient({
  url: `${Bun.env['SHIORI_DISCORD_DEBUG_WEBHOOK']}`,
});

export default webhookClient;
