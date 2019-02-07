import moment from 'moment';
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
    const text = 'INSERT INTO tblusers(firstname, lastname, othername, email, password, phoneNumber, passportUrl, isAdmin, createdDate, modifiedDate) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *';
    const {
      firstname, lastname, othername, email, password, phonenumber, passporturl,
    } = req.body;
    const isAdmin = false;
    const date = moment(new Date());

    db.query('SELECT * FROM tblusers WHERE email=$1', [email], (err, resp) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'An unexpected error occurred',
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
        [firstname, lastname, othername, email, bcrypt.hashPassword(password),
          phonenumber, passporturl, isAdmin, date, date],
        (error, result) => {
          if (error) {
            return res.status(400).json({
              status: 400,
              error: 'There was a problem signing up',
            });
          }
          // create token with hwt that expires in 24hrs
          const token = Helper.generateToken(result.rows[0].id, result.rows[0].isadmin);
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
                  isadmin: result.rows[0].isAdmin,
                },
              },
            ],
          });
        },
      );
    });
  },
  /**
   * @description login an existing user
   *
   * @function loginUser
   * @param {object} req
   * @param {object} res
   * @returns {object} json data
   */
  loginUser: (req, res) => {
    const text = 'SELECT * FROM tblusers WHERE email=$1';
    const { email, password } = req.body;
    db.query(text, [email], (err, result) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: 'There was a probem trying to sign in user',
        });
      }
      const user = result.rows[0];
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'No user found',
        });
      }
      const encryptedPassword = result.rows[0].password;
      const validPassword = bcrypt.comparePassword(password, encryptedPassword);
      if (!validPassword) {
        return res.status(401).json({
          status: 401,
          error: 'Email or password does not match',
        });
      }
      const admin = result.rows[0].isadmin;
      const token = Helper.generateToken(result.rows[0].id, admin);
      return res.status(200).json({
        status: 200,
        data: [
          {
            token,
            user: {
              id: result.rows[0].id,
              firstname: result.rows[0].firstname,
              lastname: result.rows[0].lastname,
              othername: result.rows[0].othername,
              phonenumber: result.rows[0].phoneNumber,
              email: result.rows[0].email,
              passporturl: result.rows[0].passportUrl,
              isadmin: result.rows[0].isadmin,
            },
          },
        ],
      });
    });
  },
  /**
   * @description reset user password
   *
   * @function resetPassword
   * @param {object} req
   * @param {object} res
   * @returns {object} json data
   */
  resetPassword: (req, res) => {
    const { email } = req.body;
    db.query('SELECT * FROM tblusers WHERE email=$1', [email], (err, resp) => {
      if (resp.rowCount < 1) {
        res.status(404).json({
          status: 404,
          error: 'email not found',
        });
      } else {
        res.status(200).json({
          status: 200,
          data: [{
            message: 'Check your email for password reset link',
            email,
          }],
        });
      }
    });
  },
};
