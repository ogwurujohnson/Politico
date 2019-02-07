import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dbHelper from '../models/index';
import log from './winston';

const { db } = dbHelper;

const Helper = {
  /**
   * Generate Token
   * @param { string } id
   * @returns { string } token
   */
  generateToken(id, admin) {
    const token = jwt.sign({
      userId: id,
      isAdmin: admin,
    },
    process.env.SECRET, { expiresIn: '24h' });
    return token;
  },
  /**
   * CheckUniqueness
   * @param { string } name or email
   * @param { string } table_name
   * @param { string } column
   * @returns { Boolean } True or False
   */
  async isUnique(data, tableName, column) {
    const text = `SELECT * FROM ${tableName} WHERE ${column} = $1`;
    try {
      const { rows } = await db.query(text, [data]);
      if (!rows[0]) {
        return true;
      }
      return false;
    } catch (error) {
      return error;
    }
  },
  sendMail(email, content) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: 'no-reply@travelpaddy.com',
      to: email,
      subject: 'Sample NodeJS Email',
      text: content,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        log.info(error);
      } else {
        log.info(`Email sent: ${info.response}`);
      }
    });
  },
};

export default Helper;
