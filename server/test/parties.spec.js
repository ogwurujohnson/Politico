import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('Welcome route', () => {
  it('should return a welcome message', (done) => {
    chai.request(app)
      .get('/api/v1/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.message.should.equal('Welcome to the Politico Application');
        res.body.should.be.a('object');
        done();
      });
  });
  it('should return an error route message', (done) => {
    chai.request(app)
      .post('/api/v1/')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message');
        res.body.message.should.equal('Invalid request, Route does not exist');
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('Parties', () => {
  describe('GET /', () => {
    it('should get all party records', (done) => {
      chai.request(app)
        .get('/api/v1/parties')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          done();
        });
    });

    it('should get a single party record', (done) => {
      const id = 526278;
      chai.request(app)
        .get(`/api/v1/parties/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not get a single party record', (done) => {
      const id = 100;
      chai.request(app)
        .get(`/api/v1/parties/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('POST /', () => {
    it('should insert record  into data structure', (done) => {
      const data = {
        partyName: 'apc',
        hqAddress: 'abuja',
        logoUrl: '127.0.0.1',
      };
      chai.request(app)
        .post('/api/v1/parties')
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          done();
        });
    });
    it('should not insert record  into data structure', (done) => {
      const data = {
        partyName: '',
        hqAddress: 'abuja',
        logoUrl: '127.0.0.1',
      };
      chai.request(app)
        .post('/api/v1/parties')
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
  });
  
  describe('PATCH /', () => {
    it('should update name of party in data structure', (done) => {
      const identifier = 'name';
      const data = {
        userInput: 'PDP',
      };
      const partyId = 526278;
      chai.request(app)
        .patch(`/api/v1/parties/${partyId}/${identifier}`)
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          done();
        });
    });
    it('should update logo of party in data structure', (done) => {
      const identifier = 'logo';
      const data = {
        userInput: '235.8.8.5',
      };
      const partyId = 526278;
      chai.request(app)
        .patch(`/api/v1/parties/${partyId}/${identifier}`)
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          done();
        });
    });
    it('should update hq of party in data structure', (done) => {
      const identifier = 'hq';
      const data = {
        userInput: 'Lagos',
      };
      const partyId = 526278;
      chai.request(app)
        .patch(`/api/v1/parties/${partyId}/${identifier}`)
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          done();
        });
    });
    it('should return party not found', (done) => {
      const identifier = 'name';
      const data = {
        userInput: 'PDP',
      };
      const partyId = 100;
      chai.request(app)
        .patch(`/api/v1/parties/${partyId}/${identifier}`)
        .send(data)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Party not found');
          done();
        });
    });
  });

  describe('DELETE /', () => {
    it('should delete record from data structure', (done) => {
      const partyId = 526278;
      chai.request(app)
        .delete(`/api/v1/parties/${partyId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.equal('party deleted successfully');
          done();
        });
    });
    it('should return party not found', (done) => {
      const partyId = 100;
      chai.request(app)
        .delete(`/api/v1/parties/${partyId}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Party not found');
          done();
        });
    });
  });
});
