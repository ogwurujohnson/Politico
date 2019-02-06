/* eslint-disable no-useless-escape */
/* eslint-disable no-else-return */
export default {
  /**
   * @description validate signup user
   * @param {object} req - The object that return a request
   * @param {object} res - The object that returns a response
   * @param {object} next- The object that tell the next action to run
   * @returns {object}
   */
  userSignupValidation: (req, res, next) => {
    const {
      firstname, lastname, othername, email, password,
    } = req.body;
    if (
      !firstname
      || typeof firstname !== 'string'
      || firstname.toString().trim() === ''
    ) {
      return res.status(400).send({
        valid: false,
        message: 'Please provide a valid firstname',
      });
    } else if (
      !lastname
      || typeof lastname !== 'string'
      || lastname.toString().trim() === ''
    ) {
      return res.status(400).send({
        valid: false,
        message: 'Please provide a valid lastname',
      });
    } else if (
      typeof othername !== 'string'
      || othername.toString().trim() === ''
    ) {
      return res.status(400).send({
        valid: false,
        message: 'Please provide a valid othername',
      });
    } else if (
      !email
      || email.toString().trim() === ''
      || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false
    ) {
      return res.status(400).send({
        valid: false,
        message: 'Please provide a valid email',
      });
    } else if (
      !password
      || password.toString().trim() === ''
      || /.{11}/g.test(password)
      || /[<>]/.test(password) === true
      || /[=]/.test(password) === true
    ) {
      return res.status(400).send({
        valid: false,
        message: 'Please provide a valid password',
      });
    }
    return next();
  },
  /**
   * @description validate user login
   * @param {object}  req - The object that return a request
   * @param {object} res - The object that returns a response
   * @param {object} next- The object that tell the next action to run
   * @returns {object}
   */
  userLoginValidation: (req, res, next) => {
    const { email, password } = req.body;
    if (
      !email
      || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false
      || email.toString().trim() === ''
    ) {
      return res.status(400).send({
        valid: false,
        message: 'Please provide a valid email',
      });
    } else if (
      !password
      || password.toString().trim() === ''
      || /.{11/g.test(password)
      || /[<>]/.test(password) === true
      || /[=]/.test(password) === true
    ) {
      return res.status(400).send({
        valid: false,
        message: 'Please provide a valid password',
      });
    }
    return next();
  },
};
