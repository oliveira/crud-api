const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

router.use('/', require('./signup'));
router.use('/', require('./signin'));
router.use('/api/users/', require('./users'));

module.exports = router;
