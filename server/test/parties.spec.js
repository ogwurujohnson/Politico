import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();


let adminToken;

const adminData = {
  email: 'ogwurujohnson@gmail.com',
  password: 'test',
};

describe('Parties', () => {
  describe('GET /', () => {
    it('should return 200 and get an object of each party', (done) => {
      chai.request(app)
        .get('/api/v1/parties')
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('name');
          res.body.data[0].should.have.property('hqaddress');
          res.body.data[0].should.have.property('logourl');
          done();
        });
    });

    it('should get a single party record', (done) => {
      const id = 1;
      chai.request(app)
        .get(`/api/v1/parties/${id}`)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('name');
          res.body.data[0].should.have.property('hqaddress');
          res.body.data[0].should.have.property('logourl');
          done();
        });
    });

    it('should return error 404 if party not found', (done) => {
      const id = 100;
      chai.request(app)
        .get(`/api/v1/parties/${id}`)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Party not found');
          done();
        });
    });
  });

  describe('POST /', () => {
    before((done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(adminData)
        .end((err, res) => {
          if (err) done(err);
          adminToken = res.body.data[0].token;
          done();
        });
    });
    it('should insert record and return 201', (done) => {
      const data = {
        partyname: 'apc',
        hqaddress: 'abuja',
        logourl: 'https:///cloudinary.com/mypictures',
      };
      chai.request(app)
        .post('/api/v1/parties')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(data)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('partyname');
          res.body.data[0].should.have.property('hqaddress');
          res.body.data[0].should.have.property('logourl');
          done();
        });
    });
    it('should return error 409 in cases of duplication', (done) => {
      const data = {
        partyname: 'apc',
        hqaddress: 'abuja',
        logourl: 'https:///cloudinary.com/mypictures',
      };
      chai.request(app)
        .post('/api/v1/parties')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(data)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('A party with the name exists');
          done();
        });
    });
    it('should return error 400 in partyname is omitted', (done) => {
      const data = {
        partyname: '',
        hqaddress: 'abuja',
        logourl: '127.0.0.1',
      };
      chai.request(app)
        .post('/api/v1/parties')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(data)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Please provide a valid partyname');
          done();
        });
    });
    it('should return error 400 in hqaddress is omitted', (done) => {
      const data = {
        partyname: 'pdp',
        hqaddress: '',
        logourl: '127.0.0.1',
      };
      chai.request(app)
        .post('/api/v1/parties')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(data)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Please provide a valid hqaddress');
          done();
        });
    });
    it('should return error 400 if logourl is omitted', (done) => {
      const data = {
        partyname: 'pdp',
        hqaddress: 'abuja',
        logourl: '',
      };
      chai.request(app)
        .post('/api/v1/parties')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(data)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Please provide a valid logourl');
          done();
        });
    });
    it('should return error 403 if not signed in', (done) => {
      const data = {
        partyname: 'pdp',
        hqaddress: 'abuja',
        logourl: '127.0.0.1',
      };
      chai.request(app)
        .post('/api/v1/parties')
        .send(data)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('You are not logged in!');
          done();
        });
    });
  });
  
  describe('PATCH /', () => {
    before((done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(adminData)
        .end((err, res) => {
          if (err) done(err);
          adminToken = res.body.data[0].token;
          done();
        });
    });
    it('should update party details in DB and return 201', (done) => {
      const data = {
        partyname: 'pdp',
        hqaddress: 'lagos',
        logourl: 'https://cloudinary.com/myalbum'
      };
      const partyId = 1;
      chai.request(app)
        .patch(`/api/v1/parties/${partyId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(data)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('name');
          res.body.data[0].should.have.property('hqaddress');
          res.body.data[0].should.have.property('logourl');
          done();
        });
    });
    it('should error 404 if party not found', (done) => {
      const partyId = 100;
      chai.request(app)
        .delete(`/api/v1/parties/${partyId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          if (err) done(err);
          res.body.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Party not found');
          done();
        });
    });
  });

  describe('DELETE /', () => {
    it('should delete record and return 200', (done) => {
      const partyId = 1;
      chai.request(app)
        .delete(`/api/v1/parties/${partyId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          if (err) done(err);
          res.body.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.equal('Party deleted');
          done();
        });
    });
    it('should error 404 if party not found', (done) => {
      const partyId = 100;
      chai.request(app)
        .delete(`/api/v1/parties/${partyId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          if (err) done(err);
          res.body.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Party not found');
          done();
        });
    });
  });
});
