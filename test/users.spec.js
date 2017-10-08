const app = require('../index');
const supertest = require('supertest');
const { expect, should } = require('chai');
const { cleanDb } = require('./utils');

should()
const request = supertest.agent(app.listen())
const context = {}

describe('Users', () => {
  before((done) => {
    cleanDb()
    done()
  })

  describe('POST /api/signup', () => {
    it('should sign up', (done) => {
      request
        .post('/api/signup')
        .set('Accept', 'application/json')
        .send({
          email: 'test@email.com',
          password: 'testpassword',
          name: 'testname',
          username: 'testname'
        })
        .expect(201, (err, res) => {
          if (err) {
            return done(err)
          }

          res.body.should.have.property('token')
          expect(res.body.password).to.not.exist

          context.user = res.body
          context.token = res.body.token

          done()
        })
    })
  })

  describe('GET api/users/:id', () => {
    it('should not fetch user if token is invalid', (done) => {
      request
        .get('/api/users/1')
        .set({
          Accept: 'application/json',
          Authorization: 'Bearer 1'
        })
        .expect(403, done)
    })

    it('should fetch user', (done) => {
      const token = context.token;
      const id = context.user.id;
      request
        .get(`/api/users/${id}`)
        .set({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        })
        .expect(200, (err, res) => {
          if (err) { return done(err) }

          expect(res.body.user.password).to.not.exist

          done()
        })
    })
  })
})
