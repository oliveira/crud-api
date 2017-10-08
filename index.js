const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('./models/users');
const mongooseConnect = require('./db');
const controllers = require('./controllers');

const app = express();

app.use(bodyParser.json());
app.use(controllers);

mongooseConnect();

app.listen(3000, () => {
  console.log('App running on 3000');
});
