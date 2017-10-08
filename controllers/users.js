const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const verifyToken = require('../middlewares/verifyToken');

router.get('/:id', verifyToken, async(req, res) => {
  const user = await User.findById(req.params.id);
  const reqToken = req.headers.authorization.split(' ')[1];

  if (! req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404)
      .send({ message: 'Invalid identification' });
  }

  user.password = undefined;

  if (user.token === reqToken) {
    return res.status(200)
      .send({ user });
  }
});

module.exports = router;
