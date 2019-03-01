import moment from 'moment';
import dbHelper from '../models/index';

const { db } = dbHelper;

export default {
  /**
   * @description create new party
   * @function createParty
   * @param {object} req
   * @param {object} res
   * @returns {object} party object
   */
  createParty: (req, res) => {
    const text = 'INSERT INTO tblparty(name, hqAddress, logoUrl, createdDate, modifiedDate) VALUES ($1,$2,$3,$4,$5) RETURNING *';
    const {
      partyname, hqaddress, logourl,
    } = req.body;
    const date = moment(new Date());

    db.query('SELECT * FROM tblparty WHERE name=$1', [partyname], (err, resp) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: 'An unexpected error occurred',
        });
      }
      if (resp.rowCount > 0) {
        return res.status(409).json({
          status: 409,
          error: 'A party with the name exists',
        });
      }
      return db.query(
        text,
        [partyname, hqaddress, logourl, date, date],
        (error, result) => {
          if (error) {
            return res.status(400).json({
              status: 400,
              error: 'There was a problem creating party',
            });
          }
          return res.status(201).json({
            status: 201,
            data: [{
              id: result.rows[0].id,
              partyname: result.rows[0].name,
              hqaddress: result.rows[0].hqaddress,
              logourl: result.rows[0].logourl,
            }],
          });
        },
      );
    });
  },
  /**
   * @description get all parties
   * @function getAllParties
   * @param {object} req
   * @param {object} res
   * @returns [array] array of party objects
   */
  getAllParties: (req, res) => {
    db.query('SELECT * FROM tblparty', (err, resp) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'An unexpected error occured',
        });
      }
      if (resp.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'No parties',
        });
      }
      return res.status(200).json({
        status: 200,
        data: resp.rows,
      });
    });
  },
  /**
   * @description get a specific party
   * @function getSpecificParty
   * @param {object} req
   * @param {object} res
   * @returns [array] array of party object
   */
  getSpecificParty: (req, res) => {
    const text = 'SELECT * FROM tblparty WHERE id=$1';
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
          error: 'Party not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: resp.rows,
      });
    });
  },
  /**
   * @description delete a specific party
   * @function deleteParty
   * @param {object} req
   * @param {object} res
   */
  deleteParty: (req, res) => {
    const { id } = req.params;
    const text = 'DELETE FROM tblparty WHERE id=$1';

    db.query(text, [id], (err, resp) => {
      if (err) {
        res.status(500).json({
          status: 500,
          error: 'unexpected error occurred',
        });
      }
      if (resp.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'Party not found',
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Party deleted',
      });
    });
  },
  /**
   * @description edit a specific party
   * @function editSpecificParty
   * @param {object} req
   * @param {object} res
   * @returns [array] array of party object
   */
  editSpecificParty: (req, res) => {
    const text = 'UPDATE tblparty SET name=$1, hqAddress=$2, logoUrl=$3, modifiedDate=$4 WHERE id=$5 RETURNING *';
    const { partyname, hqaddress, logourl } = req.body;
    const { id } = req.params;
    const date = moment(new Date());

    db.query(text, [partyname, hqaddress, logourl, date, id], (err, resp) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'unexpected error occurred',
        });
      }
      if (resp.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'Party not found',
        });
      }
      return res.status(201).json({
        status: 201,
        data: resp.rows,
      });
    });
  },
};
