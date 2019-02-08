/* import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();


describe('Offices', () => {
  describe('GET /', () => {
    it('should return status 200 and get all offices', (done) => {
      chai.request(app)
        .get('/api/v1/offices')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('')
          done();
        });
    });

    it('should get a single office record', (done) => {
      const id = 87879;
      chai.request(app)
        .get(`/api/v1/offices/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not get a single office record', (done) => {
      const id = 100;
      chai.request(app)
        .get(`/api/v1/offices/${id}`)
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
        officeType: 'govt',
        officeName: 'govt name',
      };
      chai.request(app)
        .post('/api/v1/offices')
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          done();
        });
    });
    it('should not insert record  into data structure', (done) => {
      const data = {
        officeType: '',
        officeName: 'govt name',
      };
      chai.request(app)
        .post('/api/v1/offices')
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
    it('should update name of office in data structure', (done) => {
      const identifier = 'name';
      const data = {
        userInput: 'Governor',
      };
      const officeId = 87879;
      chai.request(app)
        .patch(`/api/v1/offices/${officeId}/${identifier}`)
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          done();
        });
    });
    it('should update type of office in data structure', (done) => {
      const identifier = 'type';
      const data = {
        userInput: 'Legislative',
      };
      const officeId = 87879;
      chai.request(app)
        .patch(`/api/v1/offices/${officeId}/${identifier}`)
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          done();
        });
    });
    it('should return office not found', (done) => {
      const identifier = 'name';
      const data = {
        userInput: 'PDP',
      };
      const officeId = 100;
      chai.request(app)
        .patch(`/api/v1/offices/${officeId}/${identifier}`)
        .send(data)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Office not found');
          done();
        });
    });
  });

  describe('DELETE /', () => {
    it('should delete record from data structure', (done) => {
      const officeId = 87879;
      chai.request(app)
        .delete(`/api/v1/offices/${officeId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.equal('Office deleted Successfully');
          done();
        });
    });
    it('should return  office not found', (done) => {
      const officeId = 100;
      chai.request(app)
        .delete(`/api/v1/offices/${officeId}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Office not found');
          done();
        });
    });
  });
}); */