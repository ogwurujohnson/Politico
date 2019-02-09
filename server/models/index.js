import dotenv from 'dotenv';
import pg from 'pg';
import log from '../helpers/winston';


dotenv.config();

const nodeEnv = process.env.NODE_ENV;


const config = {
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB_DEV,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};
const herokuconfig = {
  host: process.env.HEROKU_HOST,
  user: process.env.HEROKU_USER,
  database: process.env.HEROKU_DATABASE,
  password: process.env.HEROKU_PASSWORD,
  port: process.env.ELEPHANT_PORT,
  ssl: true,
  tcp_keepalives_idle: 3000000,
  max: 10,
  idleTimeoutMillis: 3000000,
};
const testconfig = {
  /* host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB_TEST,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT, */
  user: process.env.TRAVIS_USER,
  database: process.env.TRAVIS_DATABASE,
  password: process.env.TRAVIS_PASSWORD,
};

let pool;
if (nodeEnv === 'development') {
  pool = new pg.Pool(config);
} else if (nodeEnv === 'test') {
  pool = new pg.Pool(testconfig);
} else if (nodeEnv === 'production') {
  pool = new pg.Pool(herokuconfig);
}

const db = pool;

pool.on('connect', () => {
  log.info('connected to the db');
});


export default {
  db,
};
