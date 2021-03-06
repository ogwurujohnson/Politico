import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default {
  /**
   * @description Verify token from the req provided by the user
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object}
   */
  isLoggedIn: (req, res, next) => {
    // check if the header is present
    if (!req.headers.authorization) {
      return res.status(403).json({
        status: 403,
        error: 'You are not logged in!',
      });
    }
    // split the bearer from the token
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: 401,
        error: 'Please provide a valid token',
      });
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: 'There was an error trying to process your request',
        });
      }
      req.userid = decoded.id;
    });
    next();
  },
  /**
   * @description Verify token from the req provided by the user
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object}
   */
  isAdmin: (req, res, next) => {
    // check if the header is present
    if (!req.headers.authorization) {
      return res.status(403).json({
        status: 403,
        error: 'You are not logged in!',
      });
    }
    // split the bearer from the token
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: 401,
        error: 'Please provide a valid token',
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    const isadmin = decoded.isAdmin;
    if (isadmin === 'true') {
      return next();
    }
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized access',
    });
  },
};
