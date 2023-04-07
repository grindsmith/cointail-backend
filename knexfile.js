/**
 * Knexfile module.
 * @module knexfile
 */
require('dotenv').config();

// Update with your config settings.
module.exports = {
  local: {
    client: 'postgresql',
    connection: {
      database: 'domedao',
    },
    debug: false,
  },
  heroku: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    debug: true,
  },
  // Tutorial: https://www.youtube.com/watch?v=Y0YL1rjnqGc&t=699s
  gcloud: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST,
      // port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD, 
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    debug: true,
  },
};
