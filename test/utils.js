const mongoose = require('mongoose');

const cleanDb  = () => {
  for (const collection in mongoose.connection.collections) {
    if (mongoose.connection.collections.hasOwnProperty(collection)) {
      mongoose.connection.collections[collection].remove()
    }
  }
}

const authUser = (agent, callback) => {
  agent
    .post('/api/signin')
    .set('Accept', 'application/json')
    .send({ email: 'test@email.com', password: 'testpassword' })
    .end((err, res) => {
      if (err) { return callback(err) }

      callback(null, {
        user: res.body.username,
        token: res.body.token
      })
    })
}

module.exports = {
  cleanDb, authUser
}
