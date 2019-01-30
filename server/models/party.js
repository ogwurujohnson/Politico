import moment from 'moment';
import uuid from 'uuid';

class Party {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.parties = [
      {
        id: 526278,
        partyName: 'Test name',
        hqAddress: 'Test HQ',
        logoUrl: 'https://example.com',
      },
    ];
  }
  /**
   * @returns {object} party object
   */

  createParty(data) {
    const newParty = {
      id: uuid.v4(),
      partyName: data.partyName,
      hqAddress: data.hqAddress,
      logoUrl: data.logoUrl,
      createdDate: moment.now(),
      modifiedDate: moment.now(),
    };
    this.parties.push(newParty);
    return newParty;
  }
}

export default new Party();
