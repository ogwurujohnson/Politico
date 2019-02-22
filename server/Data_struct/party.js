import moment from 'moment';
// import uuid from 'uuid';

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
      id: (Math.floor(Math.random() * 10000)),
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
    return this.parties.find(party => party.id === id);
  }

  /**
   * @param {uuid} id
   * @param {string} partyName
   */
  editParty(id, identifier, userInput) {
    const party = this.getSingleParty(id);
    const partyIndex = this.parties.indexOf(party);
    if (identifier === 'name') {
      this.parties[partyIndex].partyName = userInput;
    } else if (identifier === 'hq') {
      this.parties[partyIndex].hqAddress = userInput;
    } else if (identifier === 'logo') {
      this.parties[partyIndex].logoUrl = userInput;
    }
    return this.parties[partyIndex];
  }

  /**
   * @param {uuid} id
   */
  deleteParty(id) {
    const party = this.getSingleParty(id);
    const partyIndex = this.parties.indexOf(party);
    this.parties.splice(partyIndex, 1);
    return this.parties;
  }
}

export default new Party();
