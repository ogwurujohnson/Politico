import pg from 'pg';
import dotenv from 'dotenv';
import bcrypt from '../helpers/bcrypt';
import log from '../helpers/winston';

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
  max: 100, // max number of clients in the pool
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

pool.on('connect', () => {});

/**
 * Create Tables
 */

const createUserTable = () => {
  const userTable = `CREATE TABLE IF NOT EXISTS
    tblusers(
      id SERIAL PRIMARY KEY,
      firstname VARCHAR(128) NOT NULL,
      lastname VARCHAR(128) NOT NULL,
      othername VARCHAR(128),
      password VARCHAR(128),
      email VARCHAR(128) NOT NULL,
      phoneNumber VARCHAR(128),
      passportUrl VARCHAR(128),
      isAdmin VARCHAR(128),
      createdDate TIMESTAMP,
      modifiedDate TIMESTAMP
    )`;
  pool.query(userTable)
    .then((res) => {
      log.info(res);
      pool.end();
    })
    .catch((err) => {
      log.info(err);
      pool.end();
    });
};

const createPartyTable = () => {
  const partyTable = `CREATE TABLE IF NOT EXISTS
  tblparty(
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    hqAddress VARCHAR(225) NOT NULL,
    logoUrl VARCHAR(128) NOT NULL,
    createdDate TIMESTAMP,
    modifiedDate TIMESTAMP
  )`;
  pool.query(partyTable)
    .then((res) => {
      log.info(res);
      pool.end();
    })
    .catch((err) => {
      log.info(err);
      pool.end();
    });
};

const createOfficeTable = () => {
  const officeTable = `CREATE TABLE IF NOT EXISTS
  tbloffice(
    id SERIAL PRIMARY KEY,
    type VARCHAR(128) NOT NULL,
    name VARCHAR(128) NOT NULL,
    createdDate TIMESTAMP,
    modifiedDate TIMESTAMP
  )`;
  pool.query(officeTable)
    .then((res) => {
      log.info(res);
      pool.end();
    })
    .catch((err) => {
      log.info(err);
      pool.end();
    });
};

const createCandidateTable = () => {
  const candidateTable = `CREATE TABLE IF NOT EXISTS
  tblcandidates(
    id SERIAL PRIMARY KEY,
    office INT NOT NULL,
    party INT NOT NULL,
    candidate INT NOT NULL
  )`;
  pool.query(candidateTable)
    .then((res) => {
      log.info(res);
      pool.end();
    })
    .catch((err) => {
      log.info(err);
      pool.end();
    });
};

const createVoteTable = () => {
  const voteTable = `CREATE TABLE IF NOT EXISTS
  tblvotes(
    id SERIAL PRIMARY KEY,
    createdOn DATE NOT NULL,
    createdBy INT NOT NULL,
    office INT NOT NULL,
    candidate INT NOT NULL
  )`;
  pool.query(voteTable)
    .then((res) => {
      log.info(res);
      pool.end();
    })
    .catch((err) => {
      log.info(err);
      pool.end();
    });
};

const createPetitionTable = () => {
  const petitionTable = `CREATE TABLE IF NOT EXISTS
  tblpetition(
    id SERIAL PRIMARY KEY,
    createdOn DATE NOT NULL,
    createdBy INT NOT NULL,
    office INT NOT NULL,
    body VARCHAR(225) NOT NULL
  )`;
  pool.query(petitionTable)
    .then((res) => {
      log.info(res);
      pool.end();
    })
    .catch((err) => {
      log.info(err);
      pool.end();
    });
};


/**
 * DROP TABLES
 */
const dropUserTable = () => {
  const userTable = 'DROP TABLE IF EXISTS tblusers';
  pool.query(userTable)
    .then((res) => {
      log.info(res);
      pool.end();
    })
    .catch((err) => {
      log.info(err);
      pool.end();
    });
};

const dropPartyTable = () => {
  const partyTable = 'DROP TABLE IF EXISTS tblparty';
  pool.query(partyTable)
    .then((res) => {
      log.info(res);
      pool.end();
    })
    .catch((err) => {
      log.info(err);
      pool.end();
    });
};

const dropOfficeTable = () => {
  const officeTable = 'DROP TABLE IF EXISTS tbloffice';
  pool.query(officeTable)
    .then((res) => {
      log.info(res);
      pool.end();
    })
    .catch((err) => {
      log.info(err);
      pool.end();
    });
};

const dropCandidateTable = () => {
  const candidateTable = 'DROP TABLE IF EXISTS tblcandidates';
  pool.query(candidateTable)
    .then((res) => {
      log.info(res);
      pool.end();
    })
    .catch((err) => {
      log.info(err);
      pool.end();
    });
};

const dropVoteTable = () => {
  const voteTable = 'DROP TABLE IF EXISTS tblvotes';
  pool.query(voteTable)
    .then((res) => {
      log.info(res);
      pool.end();
    })
    .catch((err) => {
      log.info(err);
      pool.end();
    });
};

const dropPetitionTable = () => {
  const petitionTable = 'DROP TABLE IF EXISTS tblpetition';
  pool.query(petitionTable)
    .then((res) => {
      log.info(res);
      pool.end();
    })
    .catch((err) => {
      log.info(err);
      pool.end();
    });
};


const seedUserTable = () => {
  const text = 'INSERT INTO tblusers(firstname, lastname, othername, password, email, phonenumber, passporturl, isadmin) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
  db.query('SELECT * FROM tblusers WHERE email=$1', ['ogwurujohnson@gmail.com'], (err, resp) => {
    if (err) {
      log.info(err);
    }
    if (resp.rowCount >= 1) {
      log.info('User with email already exists');
    }
    return db.query(
      text,
      ['Johnson', 'Ogwuru', 'Onyekachi', bcrypt.hashPassword('Johnny55'), 'ogwurujohnson@gmail.com', '08033525155', 'https://cloudinary.com/image/84849', true],
      (error, result) => {
        if (error) {
          log.info(error);
        }
        log.info(`user created ${result}`);
      },
    );
  });
};

const seedPartyTable = () => {
  const text = 'INSERT INTO tblparty(name, hqAddress, logoUrl) VALUES ($1,$2,$3) RETURNING *';
  db.query('SELECT * FROM tblparty WHERE name=$1', ['Test Party'], (err, resp) => {
    if (err) {
      log.info(err);
    }
    if (resp.rowCount >= 1) {
      log.info('Party already exists');
    }
    return db.query(
      text,
      ['Test Party', 'Abuja', 'https://cloudinary.com/image/84849'],
      (error, result) => {
        if (error) {
          log.info(error);
        }
        log.info(`party created ${result}`);
      },
    );
  });
};

const seedOfficeTable = () => {
  const text = 'INSERT INTO tbloffice(type, name) VALUES ($1,$2) RETURNING *';
  db.query('SELECT * FROM tbloffice WHERE name=$1', ['Test Office'], (err, resp) => {
    if (err) {
      log.info(err);
    }
    if (resp.rowCount >= 1) {
      log.info('Office with name already exists');
    }
    return db.query(
      text,
      ['Test Office Type', 'Test Office'],
      (error, result) => {
        if (error) {
          log.info(error);
        }
        log.info(`office created ${result}`);
      },
    );
  });
};


const createAllTables = () => {
  createUserTable();
  createOfficeTable();
  createPartyTable();
  createCandidateTable();
  createVoteTable();
  createPetitionTable();
};

const dropAllTables = () => {
  dropUserTable();
  dropOfficeTable();
  dropPartyTable();
  dropCandidateTable();
  dropVoteTable();
  dropPetitionTable();
};

const seedAllTables = () => {
  seedUserTable();
  seedPartyTable();
  seedOfficeTable();
};

pool.on('remove', () => {
  log.info('Disconnected');
  process.exit(0);
});

module.exports = {
  createUserTable,
  createOfficeTable,
  createPartyTable,
  createCandidateTable,
  createVoteTable,
  createPetitionTable,
  createAllTables,
  dropAllTables,
  seedAllTables,
  db,
};

require('make-runnable');
