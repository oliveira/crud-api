const express = require('express');
const bodyParser = require('body-parser');

const mongooseConnect = require('./db');
const controllers = require('./controllers');

const app = express();

app.use(bodyParser.json());
app.use(controllers);

mongooseConnect();

app.listen(3001, () => {
  console.log('App running on 3000');
});

module.exports = app;
