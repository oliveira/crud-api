const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const jwtConfig = require('../config/jwt');
const { compareHash } = require('../helpers/hash');

router.post('/api/signin', async(req, res) => {
  const email = req.body.email || false;
  const password = req.body.password || false;

  if (! email || ! password) {
    return res.status(400)
    .send({ message: 'Bad Request' });
  }

  const user = await User.findOne({ email });

  if (user) {
    const rightPassword = await compareHash(req.body.password, user.password);

    if (rightPassword) {
      const token = await jwt.sign(req.body, jwtConfig.JWT_SECRET, {
        expiresIn: jwtConfig.JWT_EXPIRATION_TIME
      });

      user.token = token;
      user.last_login = Date.now();

      await user.save();

      return res.status(200)
        .send({
          id: user.id,
          created: user.created,
          updated: user.updated,
          last_login: user.last_login,
          token: token
        });

      return res.status(500)
        .send({ message: 'Internal Server Error' });
    }
  }

  return res.status(401)
  .send({ message: 'Wrong username or password' });
});

module.exports = router;
