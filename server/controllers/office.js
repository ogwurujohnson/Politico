import moment from 'moment';
import dbHelper from '../models/index';

const { db } = dbHelper;

export default {
  /**
   * @description create new office
   * @function createOffice
   * @param {object} req
   * @param {object} res
   * @returns {object} office object
   */
  createOffice: (req, res) => {
    const text = 'INSERT INTO tbloffice(type, name, createdDate, modifiedDate) VALUES ($1,$2,$3,$4) RETURNING *';
    const {
      type, officename,
    } = req.body;
    const date = moment(new Date());

    db.query('SELECT * FROM tbloffice WHERE name=$1', [officename], (err, resp) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'An unexpected error occurred',
        });
      }
      if (resp.rowCount > 0) {
        return res.status(409).json({
          status: 409,
          error: 'An office with the name exists',
        });
      }
      return db.query(
        text,
        [type, officename, date, date],
        (error, result) => {
          if (error) {
            return res.status(400).json({
              status: 400,
              error: 'There was a problem creating office',
            });
          }
          return res.status(201).json({
            status: 201,
            data: [{
              id: result.rows[0].id,
              type: result.rows[0].type,
              officename: result.rows[0].name,
            }],
          });
        },
      );
    });
  },
  /**
   * @description get all offices
   * @function getAllOffices
   * @param {object} req
   * @param {object} res
   * @returns [array] array of office objects
   */
  getAllOffices: (req, res) => {
    db.query('SELECT * FROM tbloffice', (err, resp) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'An unexpected error occured',
        });
      }
      if (resp.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'No offices',
        });
      }
      return res.status(200).json({
        status: 200,
        data: resp.rows,
      });
    });
  },
  /**
   * @description get a specific office
   * @function getSpecificOffice
   * @param {object} req
   * @param {object} res
   * @returns [array] array of office object
   */
  getSpecificOffice: (req, res) => {
    const text = "SELECT tbloffice.name AS officename, CONCAT(tblusers.firstname,' ',  tblusers.lastname) AS candidatename, tblparty.name AS partyname  FROM tblusers, tblparty, tbloffice, tblcandidates WHERE tblcandidates.office = tbloffice.id AND tblparty.id = tblcandidates.party AND tblusers.id = tblcandidates.candidate AND tblcandidates.office = $1 AND tblcandidates.status = 1 ";
    const { id } = req.params;
    db.query(text, [id], (err, resp) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'An unexpected error occurred',
        });
      }
      if (resp.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'No office and candidate info found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: resp.rows,
      });
    });
  },
};
