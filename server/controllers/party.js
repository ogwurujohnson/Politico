import PartyModel from '../models/party';

const Party = {
  /**
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
};

export default Party;
