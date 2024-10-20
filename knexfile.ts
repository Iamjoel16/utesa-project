import { Knex } from 'knex';

const knexConfig: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'utesa',
    database: 'projects'
  },
  pool: { min: 0, max: 7 }
};

export default knexConfig;
