export default {
  prod: {
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DATABASE,
    entities: ['dist/modules/**/infrastructure/typeorm/entities/*.js'],
    migrations: ['dist/shared/infrastructure/typeorm/migrations/*.js'],
  },
  dev: {
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DATABASE,
    entities: ['src/modules/**/infrastructure/typeorm/entities/*.{js,ts}'],
    migrations: ['src/shared/infrastructure/typeorm/migrations/*.{js,ts}'],
  },
  test: {
    host: process.env.POSTGRES_HOST,
    port: 1234,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DATABASE,
    entities: ['src/modules/**/infrastructure/typeorm/entities/*.ts'],
    migrations: ['src/shared/infrastructure/typeorm/migrations/*.ts'],
  },
};
