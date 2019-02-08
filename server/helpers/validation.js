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
      firstname, lastname, othername, email, password, phonenumber,
    } = req.body;
    if (
      !firstname
      || typeof firstname !== 'string'
      || firstname.toString().trim() === ''
      || /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/.test(firstname) === false
    ) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid firstname',
      });
    } else if (
      !lastname
      || typeof lastname !== 'string'
      || lastname.toString().trim() === ''
      || /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/.test(lastname) === false
    ) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid lastname',
      });
    } else if (
      typeof othername !== 'string'
      || othername.toString().trim() === ''
      || /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/.test(othername) === false
    ) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid othername',
      });
    } else if (
      !email
      || email.toString().trim() === ''
      || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false
    ) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid email',
      });
    } else if (
      !password
      || password.toString().trim() === ''
      || /.{11}/g.test(password)
      || /[<>]/.test(password) === true
      || /[=]/.test(password) === true
    ) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid password',
      });
    } else if (
      !phonenumber
      || /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(phonenumber) === false
    ) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid phone number',
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
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid email',
      });
    } else if (
      !password
      || password.toString().trim() === ''
      || /.{11/g.test(password)
      || /[<>]/.test(password) === true
      || /[=]/.test(password) === true
    ) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid password',
      });
    }
    return next();
  },
  /**
   * @description validate party creation
   * @param {object}  req - The object that return a request
   * @param {object} res - The object that returns a response
   * @param {object} next- The object that tell the next action to run
   * @returns {object}
   */
  partyValidation: (req, res, next) => {
    const { partyname, hqaddress, logourl } = req.body;
    if (
      !partyname
      || typeof partyname !== 'string'
      || partyname.toString().trim() === ''
      || /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/.test(partyname) === false
    ) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid partyname',
      });
    } else if (
      !hqaddress
      || typeof hqaddress !== 'string'
      || hqaddress.toString().trim() === ''
    ) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid hqaddress',
      });
    } else if (
      !logourl
      || typeof logourl !== 'string'
      || logourl.toString().trim() === ''
    ) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid logourl',
      });
    }
    return next();
  },
  /**
   * @description validate party creation
   * @param {object}  req - The object that return a request
   * @param {object} res - The object that returns a response
   * @param {object} next- The object that tell the next action to run
   * @returns {object}
   */
  officeValidation: (req, res, next) => {
    const { type, officename } = req.body;
    if (
      !type
      || typeof type !== 'string'
      || type.toString().trim() === ''
    ) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid office type',
      });
    } else if (
      !officename
      || typeof officename !== 'string'
      || officename.toString().trim() === ''
      || /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/.test(officename) === false
    ) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid office name',
      });
    }
    return next();
  },
  /**
   * @description validate id query parameters
   * @param {object}  req - The object that return a request
   * @param {object} res - The object that returns a response
   * @param {object} next- The object that tell the next action to run
   * @returns {object}
   */
  idQueryParameter: (req, res, next) => {
    const { id } = req.params;
    const ID = Number(id);
    if (
      !ID
      || typeof ID !== 'number'
      || Math.sign(ID === -1)
    ) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid id query parameter',
      });
    }
    return next();
  },
  /**
   * @description validate uid query parameters
   * @param {object}  req - The object that return a request
   * @param {object} res - The object that returns a response
   * @param {object} next- The object that tell the next action to run
   * @returns {object}
   */
  uIdQueryParameter: (req, res, next) => {
    const { uId } = req.params;
    const UID = Number(uId);
    if (
      !UID
      || typeof UID !== 'number'
      || Math.sign(UID === -1)
    ) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid uId query parameter',
      });
    }
    return next();
  },
};
