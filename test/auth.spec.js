const app = require('../index.js');
const supertest = require('supertest');
const { should } = require('chai');
const { authUser } = require('./utils');

should()
const request = supertest.agent(app.listen())
const context = {}

describe('Auth', () => {
  before((done) => {
    authUser(request, (err, { user, token }) => {
      if (err) {
        console.log(err);
        return done(err)
      }

      context.user = user
      context.token = token
      done()
    })
  })

  describe('POST /api/signin', () => {
    it('should throw 401 if credentials are incorrect', (done) => {
      request
        .post('/api/signin')
        .set('Accept', 'application/json')
        .send({ email: 'test@email.com', password: 'testpasswordwrong' })
        .expect(401, done)
    })

    it('should auth user', (done) => {
      request
        .post('/api/signin')
        .set('Accept', 'application/json')
        .send({ email: 'test@email.com', password: 'testpassword' })
        .expect(200, done)
    })
  })
})
