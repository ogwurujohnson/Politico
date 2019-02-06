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


const pool = new pg.Pool(config);
const db = pool;

pool.on('connect', () => {
  console.log('connected to the db');
});

export default {
  db,
};
