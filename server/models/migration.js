const createTables = `
  DROP TABLE IF EXISTS tbloffice cascade;
  DROP TABLE IF EXISTS tblusers cascade;
  DROP TABLE IF EXISTS tblparty cascade;
  DROP TABLE IF EXISTS tblcandidates cascade;
  DROP TABLE IF EXISTS tblvotes cascade;
  DROP TABLE IF EXISTS tblpetition cascade;

  CREATE TABLE IF NOT EXISTS
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
  );
  CREATE TABLE IF NOT EXISTS
  tblparty(
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    hqAddress VARCHAR(225) NOT NULL,
    logoUrl VARCHAR(128) NOT NULL,
    createdDate TIMESTAMP,
    modifiedDate TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS
  tbloffice(
    id SERIAL PRIMARY KEY,
    type VARCHAR(128) NOT NULL,
    name VARCHAR(128) NOT NULL,
    createdDate TIMESTAMP,
    modifiedDate TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS
  tblcandidates(
    id SERIAL PRIMARY KEY,
    office INT NOT NULL,
    party INT NOT NULL,
    candidate INT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS
  tblvotes(
    id SERIAL PRIMARY KEY,
    createdOn DATE NOT NULL,
    createdBy INT NOT NULL,
    office INT NOT NULL,
    candidate INT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS
  tblpetition(
    id SERIAL PRIMARY KEY,
    createdOn DATE NOT NULL,
    createdBy INT NOT NULL,
    office INT NOT NULL,
    body VARCHAR(225) NOT NULL
  );
`;

export default createTables;
