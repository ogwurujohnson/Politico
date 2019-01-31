import PartyModel from '../models/party';

const Party = {
  /**
   * @author Johnson Ogwuru
   * @param {object} req
   * @param {object} res
   * @returns {array} party array
   */

  createParty(req, res) {
    if (!req.body.partyName && !req.body.logoUrl) {
      return res.status(400).json({
        status: 400,
        error: 'Party Name and Logo Required',
      });
    }
    const party = PartyModel.createParty(req.body);
    return res.status(201).json({
      status: 201,
      data: [party],
    });
  },
  /**
   * @param {object} req
   * @param {object} res
   * @returns {array} an array of party objects
   */
  getAllParties(req, res) {
    const parties = PartyModel.getAllParties();
    return res.status(200).send({
      status: 200,
      data: parties,
    });
  },

};

export default Party;
