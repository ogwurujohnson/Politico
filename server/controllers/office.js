import OfficeModel from '../models/office';

const Office = {
  /**
   * @author Johnson Ogwuru
   * @param {object} req
   * @param {object} res
   * @returns [array] office array
   */

  createOffice(req, res) {
    if (!req.body.officeName || !req.body.officeType) {
      return res.status(400).json({
        status: 400,
        error: 'Office name and type Required',
      });
    }
    const office = OfficeModel.createOffice(req.body);
    return res.status(201).json({
      status: 201,
      data: [office],
    });
  },
  /**
   * @param {object} req
   * @param {object} res
   * @returns [array] an array of office objects
   */
  getAllOffices(req, res) {
    const offices = OfficeModel.getAllOffices();
    return res.status(200).json({
      status: 200,
      data: offices,
    });
  },
  /**
   * @param {object} req
   * @param {object} res
   * @return [array] an array of a single office object
   */
  getSingleOffice(req, res) {
    const id = Number(req.params.id);
    const office = OfficeModel.getSingleOffice(id);
    if (!office) {
      return res.status(404).json({
        status: 404,
        error: 'Office not found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: [office],
    });
  },
  /**
   * @param {object} req
   * @param {object} res
   * @returns [array] an array containing the updated office object
   */
  editOffice(req, res) {
    const id = Number(req.params.id);
    const office = OfficeModel.getSingleOffice(id);
    const { identifier } = req.params;
    const { userInput } = req.body;
    if (!office) {
      return res.status(404).json({
        status: 401,
        error: 'Office not found',
      });
    }
    const updatedOffice = OfficeModel.editOffice(id, identifier, userInput);
    return res.status(201).json({
      status: 201,
      data: [updatedOffice],
    });
  },
  /**
   * @param {object} req
   * @param {object} res
   * @returns {void} returns code 204
   */
  deleteOffice(req, res) {
    const id = Number(req.params.id);
    const office = OfficeModel.getSingleOffice(id);
    if (!office) {
      return res.status(404).json({
        status: 404,
        error: 'Office not found',
      });
    }
    const deletedOffices = OfficeModel.deleteOffice(id);
    return res.status(200).json({
      status: 200,
      data: deletedOffices,
    });
  },
};

export default Office;
