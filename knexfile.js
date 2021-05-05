// Update with your config settings.
const path = require('path');
// require('dotenv').config()
const BASE_PATH = path.join(__dirname, 'db');


module.exports = {

  test: {
    client: 'pg',
    connection: process.env.PG_TEST,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  
  development: {
    client: 'pg',
    connection: process.env.PG_DEV,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },

  production: {
    client: 'pg',
    connection: process.env.PG_PROD,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  }

};
