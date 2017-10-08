const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

module.exports = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, jwtConfig.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).send({
            message: 'Session expired'
          });
        } else {
          return res.status(403).send({
            message: 'Unauthorized'
          });
        }
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).send({
      message: 'Unauthorized'
    });
  }
}
