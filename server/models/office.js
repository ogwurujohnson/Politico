import moment from 'moment';
import uuid from 'uuid';

class Office {
  /**
   * class constructor
   * @author Johnson ogwuru
   * @param {object} data
   */
  constructor() {
    this.offices = [
      {
        id: 87879,
        type: 'test type',
        name: 'test name',
      },
    ];
  }

  /**
   * @returns {object} office object
   */
  createOffice(data) {
    const newOffice = {
      id: uuid.v4(),
      type: data.officeType,
      name: data.officeName,
    };
    this.offices.push(newOffice);
    return newOffice;
  }
}

export default new Office();
