const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const jwtConfig = require('../config/jwt');
const { makeHash } = require('../helpers/hash');

router.post('/api/signup', async(req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });

  if (findUser) {
    return res.status(409)
      .send({
        message: 'Email is already in use'
      });
  }

  const token = await jwt.sign(req.body, jwtConfig.JWT_SECRET, {
    expiresIn: jwtConfig.JWT_EXPIRATION_TIME
  });

  var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: await makeHash(req.body.password),
    phones: req.body.phones,
    token: token
  });

  await user.save((err, data) => {

    return res.status(201)
      .send({
        id: user.id,
        created: user.created,
        updated: user.updated,
        last_login: user.last_login,
        token: user.token
      });
  });
});

module.exports = router;
