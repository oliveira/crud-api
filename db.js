const mongoose = require('mongoose');
const mongodb = require('./config/mongodb');

const mongooseConnect = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(mongodb.CONNECTION_URL, { useMongoClient: true })
}

module.exports = mongooseConnect;
