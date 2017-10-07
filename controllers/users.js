const express = require('express');
const router = express.Router();
const User = require('../models/users');
const makeHash = require('../helpers/hash');

// todo: separate find and create functions

router.post('/signup', async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email });

    if (findUser) {
      res.json({ message: "Email is already in use" });
      return;
    }

    var user = new User({
       name: req.body.name,
       email: req.body.email,
       password: await makeHash(req.body.password),
       phones: req.body.phones
   });

   await user.save(function(err, data){
      return res.json({ message: {
        "id": data.id,
        "created": data.created,
        "updated": data.updated,
        "last_login": data.last_login
      } });
   });
});

module.exports = router;
