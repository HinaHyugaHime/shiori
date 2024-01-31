import pino from 'pino';
import pretty from 'pino-pretty';

import isProd from './isProd';

const logtailToken = process.env['SHIORI_LOGTAIL_TOKEN'];

export default pino(
  isProd && logtailToken
    ? {
        transport: {
          options: {
            sourceToken: logtailToken,
          },
          target: '@logtail/pino',
        },
      }
    : pretty({
        hideObject: false,
        ignore: 'pid,hostname,time,level',
      })
);
