import moment from 'moment';
import uuid from 'uuid';

class Party {
  /**
   * class constructor
   * @author Johnson Ogwuru
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

  /**
   * @returns [array] returns an array of all party objects
   */
  getAllParties() {
    return this.parties;
  }

  /**
   * @returns [array] returns an array of a single party
   */
  getSingleParty(id) {
    return this.parties.find(party => { return party.id === id });
  }

}

export default new Party();
