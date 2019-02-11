import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';

dotenv.config();

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

let adminToken;
let userToken;

const adminData = {
  email: 'ogwurujohnson@gmail.com',
  password: 'test',
};

const userData = {
  email: 'ogwurupatrick@gmail.com',
  password: 'test',
};

describe('Offices', () => {
  describe('/GET Offices', () => {
    before((done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(userData)
        .end((err, res) => {
          if (err) done(err);
          userToken = res.body.data[0].token;
          done();
        });
    });
    it('should return status 200 and get all offices', (done) => {
      chai.request(app)
        .get('/api/v1/offices')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('type');
          res.body.data[0].should.have.property('name');
          done();
        });
    });
    it('should return 200 on getting a single office record', (done) => {
      const id = 1;
      chai.request(app)
        .get(`/api/v1/offices/${id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('type');
          res.body.data[0].should.have.property('name');
          done();
        });
    });
    it('should return 404 if office not found', (done) => {
      const id = 844944;
      chai.request(app)
        .get(`/api/v1/offices/${id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Office not found');
          done();
        });
    });
  });

  describe('/ POST', () => {
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
    it('should insert record  into DB and return 201', (done) => {
      const data = {
        type: 'govt',
        officename: 'govt name',
      };
      chai.request(app)
        .post('/api/v1/offices')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('type');
          res.body.data[0].should.have.property('officename');
          done();
        });
    });
    it('should return error 409 due to duplication', (done) => {
      const data = {
        type: 'govt',
        officename: 'govt name',
      };
      chai.request(app)
        .post('/api/v1/offices')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(data)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('An office with the name exists');
          done();
        });
    });
    it('should return error 400 on issue with insertion', (done) => {
      const data = {
        typer: 'govt',
        officeName: 'govt name',
      };
      chai.request(app)
        .post('/api/v1/offices')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Please provide a valid office type');
          done();
        });
    });
  });
});
