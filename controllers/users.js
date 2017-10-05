const express = require('express');
const router = express.Router();

const User = require('../models/users');

// todo: separate find and create functions
// todo: add bcrypt on password

router.post('/signup', function(req, res){
    const email = req.body.email;

    const createUser = User.findOne({ email }, (err, user) =>  {
      if (user) {
        return res.json({ message: 'Email is already in use' });
      }

      var user = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          phones: req.body.phones
      });

      user.save(function(err, data){
          return res.json({ message: 'Sucess'});
      })
    });
});

module.exports = router;
