/* eslint-disable no-restricted-globals */
import moment from 'moment';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import dbHelper from '../models/index';

dotenv.config();


const { db } = dbHelper;

export default {
  /**
   * @author JOHNSON OGWURU
   *
   * @description indicate interest
   * @function declareInterest
   * @param {object} req
   * @param {object} res
   * @returns {object} interest object
   */
  declareInterest: (req, res) => {
    const text = 'INSERT INTO tblcandidates (office, party, candidate, manifesto, status) VALUES ($1,$2,$3,$4,$5) RETURNING *';
    const {
      office, party, manifesto,
    } = req.body;
    const candidate = req.params.uId;
    if (isNaN(office) || isNaN(party) || isNaN(candidate)) {
      return res.status(400).json({
        status: 400,
        error: 'Non-Integer number found',
      });
    }
    return db.query('SELECT * FROM tblcandidates WHERE candidate=$1', [candidate], (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'An unexpected error occurred',
        });
      }
      if (result.rowCount >= 1) {
        res.status(409).json({
          status: 409,
          error: 'Cannot declare twice',
        });
      } else {
        db.query(text, [office, party, candidate, manifesto, '0'], (error, resp) => {
          res.status(201).json({
            status: 201,
            data: resp.rows,
          });
        });
      }
    });
  },
  /**
   * @author JOHNSON OGWURU
   *
   * @description register candidate as party flag bearer
   * @function registerCandidate
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  registerCandidate: (req, res) => {
    const text = 'UPDATE tblcandidates SET status = $1 WHERE candidate = $2';
    const candidate = req.params.uId;
    if (isNaN(candidate)) {
      return res.status(400).json({
        status: 400,
        error: 'Non-Integer number found',
      });
    }
    return db.query('SELECT * FROM tblcandidates WHERE candidate=$1', [candidate], (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'An unexpected error occurred',
        });
      }
      if (result.rowCount >= 1) {
        const { status } = result.rows[0];
        let toggleStatus;
        if (status === 0) {
          toggleStatus = 1;
        } else {
          toggleStatus = 0;
        }

        db.query(text, [toggleStatus, candidate], (error, resp) => {
          res.status(201).json({
            status: 201,
            message: 'flag bearer status changed',
          });
        });
      } else {
        return res.status(404).json({
          status: 404,
          error: 'No office and candidate info found',
        });
      }
    });
  },
  /**
   * @author JOHNSON OGWURU
   *
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
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'An unexpected error occurred',
        });
      }
      if (result.rowCount >= 1) {
        res.status(409).json({
          status: 409,
          error: 'Cannot vote twice',
        });
      } else {
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
   * @author JOHNSON OGWURU
   *
   * @description check results per office
   * @function officeResults
   * @param {object} req
   * @param {object} res
   * @returns {object} office result objects
   */
  officeResults: (req, res) => {
    const { id } = req.params;
    db.query('SELECT office, candidate, COUNT(candidate) AS result FROM tblvotes WHERE office=$1 GROUP BY candidate, office', [id], (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'An unexpected error occurred',
        });
      }
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
  /**
   * @author JOHNSON OGWURU
   *
   * @description fetch single user
   * @function singleUser
   * @param {object} req
   * @param {object} res
   * @returns {object} single user record
   */
  singleUser: (req, res) => {
    const { token } = req.params;
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: 'There was an error trying to process request',
        });
      }
      const { userId } = decoded;
      db.query('SELECT * FROM tblusers WHERE id = $1', [userId], (error, resp) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: 'An unexpected error occurred',
          });
        }
        if (resp.rowCount < 1) {
          res.status(404).json({
            status: 404,
            error: 'Result not found',
          });
        } else {
          res.status(200).json({
            status: 200,
            data: resp.rows,
          });
        }
      });
    });
  },
  /**
   * @author JOHNSON OGWURU
   *
   * @description fetch single candidate
   * @function singleCandidate
   * @param {object} req
   * @param {object} res
   * @returns {object} single candidate record
   */
  singleCandidate: (req, res) => {
    const { candidateId } = req.params;
    db.query('SELECT * FROM tblcandidates WHERE candidate = $1', [candidateId], (error, resp) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: 'An unexpected error occurred',
        });
      }
      if (resp.rowCount < 1) {
        res.status(404).json({
          status: 404,
          error: 'Candidate not found',
        });
      } else {
        res.status(200).json({
          status: 200,
          data: resp.rows,
        });
      }
    });
  },
  /**
   * @author JOHNSON OGWURU
   *
   * @description fetch user votes
   * @function userVotes
   * @param {object} req
   * @param {object} res
   * @returns {object} object of all votes by user
   */
  userVotes: (req, res) => {
    const { id } = req.params;
    // eslint-disable-next-line quotes
    db.query(`SELECT tbloffice.name As office_name, CONCAT(tblusers.firstname,' ',  tblusers.lastname) AS "fullname", SPLIT_PART(tblvotes.createdon::TEXT,' ', 1) AS createdon FROM tblvotes, tbloffice, tblusers WHERE tblvotes.office = tbloffice.id AND tblvotes.candidate = tblusers.id AND createdby=$1`, [id], (error, resp) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: 'An unexpected error occurred',
        });
      }
      if (resp.rowCount < 1) {
        res.status(404).json({
          status: 404,
          error: 'No vote found',
        });
      } else {
        res.status(200).json({
          status: 200,
          data: resp.rows,
        });
      }
    });
  },
};
