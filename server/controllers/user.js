import moment from 'moment';
import dbHelper from '../models/index';


const { db } = dbHelper;

export default {
  /**
   * @description indicate interest
   * @function registerCandidate
   * @param {object} req
   * @param {object} res
   * @returns {object} interest object
   */
  registerCandidate: (req, res) => {
    const text = 'INSERT INTO tblcandidates (office, party, candidate) VALUES ($1,$2,$3) RETURNING *';
    const {
      office, party,
    } = req.body;
    const candidate = req.params.uId;
    if (isNaN(office) || isNaN(party) || isNaN(candidate)) {
      return res.status(400).json({
        status: 400,
        error: 'Non-Integer number found',
      });
    }
    return db.query('SELECT * FROM tblcandidates WHERE candidate=$1', [candidate], (err, result) => {
      if (result.rowCount >= 1) {
        res.status(409).json({
          status: 409,
          error: 'Cannot declare twice',
        });
      } else {
        db.query(text, [office, party, candidate], (error, resp) => {
          res.status(201).json({
            status: 201,
            data: resp.rows,
          });
        });
      }
    });
  },
  /**
   * @description vote candidate
   * @function voteCandidate
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  voteCandidate: (req, res) => {
    const text = 'INSERT INTO tblvotes (createdOn, createdBy, office, candidate) VALUES ($1,$2,$3,$4) RETURNING *';
    const {
      voter, office, candidate,
    } = req.body;
    const date = moment(new Date());


    if (isNaN(voter) || isNaN(office) || isNaN(candidate)) {
      return res.status(400).json({
        status: 500,
        error: 'None-Integer number found',
      });
    }
    return db.query('SELECT * FROM tblvotes WHERE office=$1 AND createdby=$2', [office, voter], (err, result) => {
      if (result.rowCount >= 1) {
        res.status(409).json({
          status: 409,
          error: 'Cannot vote twice',
        });
      } else {
        console.log(text);
        db.query(text, [date, voter, office, candidate], (error, resp) => {
          res.status(201).json({
            status: 201,
            data: resp.rows,
          });
        });
      }
    });
  },
  /**
   * @description check results per office
   * @function officeResults
   * @param {object} req
   * @param {object} res
   * @returns {object} office result objects
   */
  officeResults: (req, res) => {
    const { id } = req.params;
    db.query('SELECT office, candidate, COUNT(candidate) AS result FROM tblvotes WHERE office=$1 GROUP BY candidate, office', [id], (err, result) => {
      if (result.rowCount < 1) {
        res.status(404).json({
          status: 404,
          error: 'Result not found',
        });
      } else {
        res.status(200).json({
          status: 200,
          data: result.rows,
        });
      }
    });
  },
};
