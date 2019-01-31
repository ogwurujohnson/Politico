import OfficeModel from '../models/office';

const Office = {
  /**
   * @author Johnson Ogwuru
   * @param {object} req
   * @param {object} res
   * @returns [array] office array
   */

  createOffice(req, res) {
    if (!req.body.officeName && !req.body.officeType) {
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
  
};

export default Office;