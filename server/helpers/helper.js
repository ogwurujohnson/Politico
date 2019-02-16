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
  sendMail(email, content) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: 'no-reply@politico.com',
      to: email,
      subject: 'Password Reset',
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
  generateRandomNumbers(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
};

export default Helper;
