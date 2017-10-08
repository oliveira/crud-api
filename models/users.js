var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    name: String,
    email: String,
    email: String,
    password: String,
    token: String,
    phones: { number: { type: String },
              ddd: { type: String },
              default: [] },
    created: { type: Date, required: true, default: Date.now },
    updated: { type: Date, required: true, default: Date.now },
    last_login: { type: Date, required: true, default: Date.now }
}));
