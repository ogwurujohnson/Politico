import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';

dotenv.config();

process.env.NODE_ENV = 'test';

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
