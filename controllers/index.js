const express = require('express');
const router = express.Router();

router.use('/', require('./signup'));
router.use('/', require('./signin'));
router.use('/api/users/', require('./users'));

module.exports = router;
