import uuid from 'uuid';
import pg from 'pg';
import logger from 'winston';
import dotenv from 'dotenv';
import bcrypt from '../helpers/bcrypt';

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

let pool;
if (nodeEnv === 'development' || nodeEnv === 'test') {
  pool = new pg.Pool(config);
} else if (nodeEnv === 'production') {
  const dbUrl = 'postgres://rmohfidudpzrqj:788451b2b99d5d1b6acdbc5756e38218bca4868cff14e45db4c470d9eae3bd67@ec2-54-243-223-245.compute-1.amazonaws.com:5432/deml8d3us62o6d';
  pool = new pg.Pool({ dbUrl });
}

const db = pool;

pool.on('connect', () => {});

/**
 * Create Tables
 */

const createUserTable = () => {
  const userTable = `CREATE TABLE IF NOT EXISTS
    tblusers(
      id UUID PRIMARY KEY,
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
      logger.log(res);
      pool.end();
    })
    .catch((err) => {
      logger.log(err);
      pool.end();
    });
};

const createPartyTable = () => {
  const partyTable = `CREATE TABLE IF NOT EXISTS
  tblparty(
    id UUID PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    hqAddress VARCHAR(225) NOT NULL,
    logoUrl VARCHAR(128) NOT NULL,
    createdDate TIMESTAMP,
    modifiedDate TIMESTAMP
  )`;
  pool.query(partyTable)
    .then((res) => {
      logger.log(res);
      pool.end();
    })
    .catch((err) => {
      logger.log(err);
      pool.end();
    });
};

const createOfficeTable = () => {
  const officeTable = `CREATE TABLE IF NOT EXISTS
  tbloffice(
    id UUID PRIMARY KEY,
    type VARCHAR(128) NOT NULL,
    name VARCHAR(128) NOT NULL,
    createdDate TIMESTAMP,
    modifiedDate TIMESTAMP
  )`;
  pool.query(officeTable)
    .then((res) => {
      logger.log(res);
      pool.end();
    })
    .catch((err) => {
      logger.log(err);
      pool.end();
    });
};

const createCandidateTable = () => {
  const candidateTable = `CREATE TABLE IF NOT EXISTS
  tblcandidates(
    id UUID PRIMARY KEY,
    office INT NOT NULL,
    party INT NOT NULL,
    candidate INT NOT NULL
  )`;
  pool.query(candidateTable)
    .then((res) => {
      logger.log(res);
      pool.end();
    })
    .catch((err) => {
      logger.log(err);
      pool.end();
    });
};

const createVoteTable = () => {
  const voteTable = `CREATE TABLE IF NOT EXISTS
  tblvotes(
    id UUID PRIMARY KEY,
    createdOn DATE NOT NULL,
    createdBy INT NOT NULL,
    office INT NOT NULL,
    candidate INT NOT NULL
  )`;
  pool.query(voteTable)
    .then((res) => {
      logger.log(res);
      pool.end();
    })
    .catch((err) => {
      logger.log(err);
      pool.end();
    });
};

const createPetitionTable = () => {
  const petitionTable = `CREATE TABLE IF NOT EXISTS
  tblpetition(
    id UUID PRIMARY KEY,
    createdOn DATE NOT NULL,
    createdBy INT NOT NULL,
    office INT NOT NULL,
    body VARCHAR(225) NOT NULL
  )`;
  pool.query(petitionTable)
    .then((res) => {
      logger.log(res);
      pool.end();
    })
    .catch((err) => {
      logger.log(err);
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
      logger.log(res);
      pool.end();
    })
    .catch((err) => {
      logger.log(err);
      pool.end();
    });
};

const dropPartyTable = () => {
  const partyTable = 'DROP TABLE IF EXISTS tblparty';
  pool.query(partyTable)
    .then((res) => {
      logger.log(res);
      pool.end();
    })
    .catch((err) => {
      logger.log(err);
      pool.end();
    });
};

const dropOfficeTable = () => {
  const officeTable = 'DROP TABLE IF EXISTS tbloffice';
  pool.query(officeTable)
    .then((res) => {
      logger.log(res);
      pool.end();
    })
    .catch((err) => {
      logger.log(err);
      pool.end();
    });
};

const dropCandidateTable = () => {
  const candidateTable = 'DROP TABLE IF EXISTS tblcandidates';
  pool.query(candidateTable)
    .then((res) => {
      logger.log(res);
      pool.end();
    })
    .catch((err) => {
      logger.log(err);
      pool.end();
    });
};

const dropVoteTable = () => {
  const voteTable = 'DROP TABLE IF EXISTS tblvotes';
  pool.query(voteTable)
    .then((res) => {
      logger.log(res);
      pool.end();
    })
    .catch((err) => {
      logger.log(err);
      pool.end();
    });
};

const dropPetitionTable = () => {
  const petitionTable = 'DROP TABLE IF EXISTS tblpetition';
  pool.query(petitionTable)
    .then((res) => {
      logger.log(res);
      pool.end();
    })
    .catch((err) => {
      logger.log(err);
      pool.end();
    });
};


const seedUserTable = () => {
  const text = 'INSERT INTO tblusers(id, firstname, lastname, othername, password, email, phonenumber, passporturl, isadmin) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *';
  db.query('SELECT * FROM tblusers WHERE email=$1', ['ogwurujohnson@gmail.com'], (err, resp) => {
    if (err) {
      logger.log(err);
    }
    if (resp.rowCount >= 1) {
      logger.log('User with email already exists');
    }
    return db.query(
      text,
      [uuid.v4(), 'Johnson', 'Ogwuru', 'Onyekachi', bcrypt.hashPassword('Johnny55'), 'ogwurujohnson@gmail.com', '08033525155', 'https://cloudinary.com/image/84849', true],
      (error, result) => {
        if (error) {
          logger.log(error);
        }
        logger.log(`user created ${result}`);
      },
    );
  });
};

const seedPartyTable = () => {
  const text = 'INSERT INTO tblparty(id, name, hqAddress, logoUrl) VALUES ($1,$2,$3,$4) RETURNING *';
  db.query('SELECT * FROM tblparty WHERE name=$1', ['Test Party'], (err, resp) => {
    if (err) {
      logger.log(err);
    }
    if (resp.rowCount >= 1) {
      logger.log('Party already exists');
    }
    return db.query(
      text,
      [uuid.v4(), 'Test Party', 'Abuja', 'https://cloudinary.com/image/84849'],
      (error, result) => {
        if (error) {
          logger.log(error);
        }
        logger.log(`party created ${result}`);
      },
    );
  });
};

const seedOfficeTable = () => {
  const text = 'INSERT INTO tbloffice(id, type, name) VALUES ($1,$2,$3) RETURNING *';
  db.query('SELECT * FROM tbloffice WHERE name=$1', ['Test Office'], (err, resp) => {
    if (err) {
      logger.log(err);
    }
    if (resp.rowCount >= 1) {
      logger.log('Office with name already exists');
    }
    return db.query(
      text,
      [uuid.v4(), 'Test Office Type', 'Test Office'],
      (error, result) => {
        if (error) {
          logger.log(error);
        }
        logger.log(`office created ${result}`);
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
  logger.log('Disconnected');
  process.exit(0);
});

export default {
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
