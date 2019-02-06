import jwt from 'jsonwebtoken';
import dbHelper from '../models/index';

const { db } = dbHelper;

const Helper = {
  /**
   * Generate Token
   * @param { string } id
   * @returns { string } token
   */
  generateToken(id) {
    const token = jwt.sign({
      userId: id,
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
};

export default Helper;
