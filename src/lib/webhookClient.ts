import {WebhookClient} from 'discord.js';

const webhookClient = new WebhookClient({
  url: `${process.env['SHIORI_DISCORD_DEBUG_WEBHOOK']}`,
});

export default webhookClient;
