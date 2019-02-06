import uuidv4 from 'uuid/v4';
import moment from 'moment';
import logger from 'winston';
import dbHelper from '../models/index';
import Helper from '../helpers/helper';

const { db } = dbHelper;

export default {
  /**
   * @description indicate interest
   * @function declareInterest
   * @param {object} req
   * @param {object} res
   * @returns {object} interest object
   */
  declareInterest: (req, res) => {
    const text = 'INSERT INTO tblcandidates (id, office, party, candidate) VALUES ($1,$2,$3,$4) RETURNING *';
    const {
      office,party,
    } = req.body;
    const candidate = req.params.uId;
    const id = uuidv4();
    const date = moment(new Date());

    if(isNaN(office) || isNaN(party) || isNaN(candidate)){
      return res.status(400).json({
        status: 500,
        error: 'None-Integer number found',
      });
    }
    return db.query('SELECT * FROM tblcandidates WHERE candidate=$1', [candidate], (err, result) => {
      if (result.rowCount >= 1) {
        res.status(409).json({
          status: 409,
          error: 'Cannot declare twice',
        });
      } else {
        db.query(text, [id,office,party,candidate], (error, resp) => {
          res.status(201).json({
            status: 201,
            data: resp.rows,
          });
        });
      }
    });
  },
  voteCandidate: (req, res) => {
    const text = 'INSERT INTO tblvotes (id, createdOn, createdBy, office, candidate) VALUES ($1,$2,$3,$4,$5) RETURNING *';
    const {
     voter, office, candidate,
    } = req.body;
    const id = uuidv4();
    const date = moment(new Date());

    if(isNaN(voter) || isNaN(office) || isNaN(candidate)) {
      return res.status(400).json({
        status: 500,
        error: "None-Integer number found",
      });
    }
    return db.query('SELECT * FROM tblvotes WHERE candidate=$1 AND createdby=$2', [candidate, voter], (err, result) => {
      if (result.rowCount >= 1) {
        res.status(409).json({
          status: 409,
          error: 'Cannot vote twice',
        });
      } else {
        console.log(text);
        db.query(text, [id, date, voter, office, candidate], (error, resp) => {
          res.status(201).json({
            status: 201,
            data: resp.rows,
          });
        });
      }
    });
  },
}