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
        officeType: 'test type',
        officeName: 'test name',
      },
    ];
  }

  /**
   * @returns {object} office object
   */
  createOffice(data) {
    const newOffice = {
      id: Math.floor(Math.random() * 10000),
      officeType: data.officeType,
      officeName: data.officeName,
      createdDate: moment.now(),
      modifiedDate: moment.now(),
    };
    this.offices.push(newOffice);
    return newOffice;
  }

  /**
   * @return [array] returns an array of all office objects
   */
  getAllOffices() {
    return this.offices;
  }

  /**
   * @returns [array] returns an array of a single office
   */
  getSingleOffice(id) {
    return this.offices.find(office => office.id === id);
  }

  /**
   * @param {uuid} id
   * @param {string} officeName
   */
  editOffice(id, officeName) {
    const office = this.getSingleOffice(id);
    const officeIndex = this.offices.indexOf(office);
    this.offices[officeIndex].officeName = officeName;
    return this.offices[officeIndex];
  }

  /**
   * @param {uuid} id
   */
  deleteOffice(id) {
    const office = this.getSingleOffice(id);
    const officeIndex = this.parties.indexOf(office);
    this.offices.splice(officeIndex, 1);
    return this.offices;
  }
}

export default new Office();
