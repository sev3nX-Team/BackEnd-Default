import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import connections from '@shared/infrastructure/typeorm/connections';
import { logger } from '@shared/helpers/pino';

var connection = {};

if (process.env.NODE_ENV === 'development') {
  connection = { ...connections.dev };
} else if (process.env.NODE_ENV === 'test') {
  connection = { ...connections.test };
} else {
  connection = { ...connections.prod };
}

const connectionConfig: DataSourceOptions = {
  type: 'postgres',
  ...connection,
};

export const dataSource = new DataSource(connectionConfig);

dataSource.initialize().then(() => logger.info('Database initialized! ✔'));
