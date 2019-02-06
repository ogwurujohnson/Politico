import uuidv4 from 'uuid/v4';
import moment from 'moment';
import logger from 'winston';
import dbHelper from '../models/index';
import Helper from '../helpers/helper';
import bcrypt from '../helpers/bcrypt';

const { db } = dbHelper;

export default {
  /**
   * @description create a new user
   * @function createUser
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  createUser: (req, res) => {
    const text = 'INSERT INTO tblusers(id, firstname, lastname, othername, email, password, phoneNumber, passportUrl, isAdmin, createdDate, modifiedDate) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *';
    const {
      firstname, lastname, othername, email, password, phonenumber, passporturl,
    } = req.body;
    const id = uuidv4();
    const isAdmin = false;
    const date = moment(new Date());

    db.query('SELECT * FROM tblusers WHERE email=$1', [email], (err, resp) => {
      if (err) {
        logger.log(err);
        return res.status(500).json({
          status: 500,
          error: 'An unexpected error occured',
        });
      }
      if (resp.rowCount > 0) {
        return res.status(409).json({
          status: 409,
          error: 'A user with that email exists',
        });
      }
      return db.query(
        text,
        [id, firstname, lastname, othername, email, bcrypt.hashPassword(password),
          phonenumber, passporturl, isAdmin, date, date],
        (error, result) => {
          if (error) {
            logger.log(error);
            return res.status(400).json({
              status: 400,
              error: 'There was a problem signing up',
            });
          }
          // create token with hwt that expires in 24hrs
          const token = Helper.generateToken(result.rows[0].id);
          return res.status(201).json({
            status: 201,
            data: [
              {
                token,
                user: {
                  id: result.rows[0].id,
                  firstname: result.rows[0].firstname,
                  lastname: result.rows[0].lastname,
                  email: result.rows[0].email,
                  phonenumber: result.rows[0].phoneNumber,
                },
              },
            ],
          });
        },
      );
    });
  },
};
