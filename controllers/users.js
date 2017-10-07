const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const { makeHash, compareHash } = require('../helpers/hash');

// todo: separate find and create functions
// todo: remove hardcoded data

router.post('/signup', async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email });

    if (findUser) {
        return res.status(409)
          .send({
            message: "Email is already in use"
          });
    }

    const token = await jwt.sign(req.body, 'S3cr37', {
        expiresIn: '30m'
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
          "id": user.id,
          "created": user.created,
          "updated": user.updated,
          "last_login": user.last_login,
          "token": user.token
        });
   });
});

router.post('/signin', async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });

  if (user) {
    const rightPassword = await compareHash(req.body.password, user.password);

    if (rightPassword) {
      return res.status(200)
        .send({
          "id": user.id,
          "created": user.created,
          "updated": user.updated,
          "last_login": user.last_login,
          "token": user.token
        });
    }
  }

  return res.status(401)
    .send({
      message: "Wrong username or password"
    });
});

module.exports = router;
