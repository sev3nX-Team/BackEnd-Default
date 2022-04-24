import 'reflect-metadata';
import 'dotenv/config';
import '@shared/infrastructure/typeorm';
import '@modules/index';

import config from '@config/env';
import app from '@shared/infrastructure/http/app';
import { CryptoHelper } from '@shared/helpers/crypto';
import { logger } from '@shared/helpers/pino';

const port = config.server.port;

app.listen(config.server.port, async () => {
  if (process.env.NODE_ENV === 'development') {
    logger.info('API in Development mode! ✔');
  }

  await CryptoHelper.setup(config.crypto);
  logger.info(
    'Server running on port:' + '\x1b[32m' + ` ${port}` + '\x1b[0m' + ' ✔',
  );
});
