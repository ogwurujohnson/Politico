import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();


describe('Offices', () => {
  describe('GET /', () => {
    it('should get all office records', (done) => {
      chai.request(app)
        .get('/api/v1/offices')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
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
});
