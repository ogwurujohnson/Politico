import PartyModel from '../models/party';

const Party = {
  /**
   * @author Johnson Ogwuru
   * @param {object} req
   * @param {object} res
   * @returns [array] party array
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
   * @returns [array] an array of party objects
   */
  getAllParties(req, res) {
    const parties = PartyModel.getAllParties();
    return res.status(200).json({
      status: 200,
      data: parties,
    });
  },
  /**
   * @param {object} req
   * @param {object} res
   * @returns [array] an array of a single party object
   */
  getSingleParty(req, res) {
    const id = Number(req.params.id);
    const party = PartyModel.getSingleParty(id);
    if (!party) {
      return res.status(404).json({
        status: 404,
        error: 'Party not found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: [party],
    });
  },
  /**
   * @param {object} req
   * @param {object} res
   * @returns [array] an array containing the updated party object
   */
  editParty(req, res) {
    const id = Number(req.params.id);
    const party = PartyModel.getSingleParty(id);
    if (!party) {
      return res.status(404).json({
        status: 404,
        error: 'Party not found',
      });
    }
    const updatedParty = PartyModel.editParty(id, req.params.partyName);
    return res.status(201).json({
      status: 201,
      data: [updatedParty],
    });
  },
  /**
   * @param {object} req
   * @param {object} res
   * @returns {void} returns code 2014
   */
  deleteParty(req, res) {
    const id = Number(req.params.id);
    const party = PartyModel.getSingleParty(id);
    if (!party) {
      return res.status(404).json({
        status: 404,
        error: 'Party not found',
      });
    }
    const remainingParties = PartyModel.deleteParty(id);
    return res.status(204).json({
      status: 204,
      data: remainingParties,
    });
  },
};

export default Party;
