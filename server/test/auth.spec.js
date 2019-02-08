import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';

dotenv.config();

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

describe('Authentication', () => {
  describe('POST /signup', () => {
    const data = {
      firstname: 'Johnson',
      lastname: 'Test',
      othername: 'Test other',
      email: 'test@johnson.com',
      password: 'Johnny55',
      phonenumber: '08033525155',
      passporturl: 'https://test.cloudinary.com',
    };
    it('should be able to signup and return 201', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(data)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('token');
          res.body.data[0].should.have.property('user');
          res.body.data[0].user.should.be.a('object');
          res.body.data[0].user.should.have.property('id');
          res.body.data[0].user.should.have.property('firstname');
          res.body.data[0].user.should.have.property('lastname');
          res.body.data[0].user.should.have.property('email');
          res.body.data[0].user.should.have.property('phonenumber');
          res.body.data[0].user.should.have.property('passporturl');
          res.body.data[0].user.should.have.property('isadmin');
          done();
        });
    });
    it('should return error 409, when data conflicts', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(data)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          res.body.error.should.equal('A user with that email exists');
          done();
        });
    });
  });
  describe('POST /login', () => {
    it('should be able to login and return 200', (done) => {
      const data = {
        email: 'test@johnson.com',
        password: 'Johnny55',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(data)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('token');
          res.body.data[0].should.have.property('user');
          res.body.data[0].user.should.be.a('object');
          res.body.data[0].user.should.have.property('id');
          res.body.data[0].user.should.have.property('firstname');
          res.body.data[0].user.should.have.property('lastname');
          res.body.data[0].user.should.have.property('othername');
          res.body.data[0].user.should.have.property('email');
          res.body.data[0].user.should.have.property('phonenumber');
          res.body.data[0].user.should.have.property('passporturl');
          res.body.data[0].user.should.have.property('isadmin');
          done();
        });
    });
    it('should return 404 if user does not exist', (done) => {
      const errorData = {
        email: 'test@johnson1.com',
        password: 'Johnny55',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(errorData)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('No user found');
          done();
        });
    });
    it('should return 401 if password does not match', (done) => {
      const errData = {
        email: 'test@johnson.com',
        password: 'Johnny5',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(errData)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Email or password does not match');
          done();
        });
    });
  });
  describe('POST /reset', () => {
    it('should return 200 on success', (done) => {
      const data = {
        email: 'test@johnson.com',
      };
      chai.request(app)
        .post('/api/v1/auth/reset')
        .send(data)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('message');
          res.body.data[0].should.have.property('email');
          res.body.data[0].message.should.equal('Check your email for password reset link');
          done();
        });
    });
    it('should return 404 if email does not exist', (done) => {
      const errorData = {
        email: 'test2@johnsonnn.com',
      };
      chai.request(app)
        .post('/api/v1/auth/reset')
        .send(errorData)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('email not found');
          done();
        });
    });
  });
});
