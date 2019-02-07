import dotenv from 'dotenv';
import pg from 'pg';
import logger from 'winston';

dotenv.config();

const nodeEnv = process.env.NODE_ENV;


let dbName;
if (nodeEnv === 'development') {
  dbName = process.env.POSTGRES_DB_DEV;
} else if (nodeEnv === 'test') {
  dbName = process.env.POSTGRES_DB_TEST;
} else if (nodeEnv === 'production') {
  dbName = '';
}

const config = {
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  database: dbName,
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

let pool;
if (nodeEnv === 'development' || nodeEnv === 'test') {
  pool = new pg.Pool(config);
} else if (nodeEnv === 'production') {
  pool = new pg.Pool(herokuconfig);
}

const db = pool;

pool.on('connect', () => {
  console.log('connected to the db');
});

export default {
  db,
};
