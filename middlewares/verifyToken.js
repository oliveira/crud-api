var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'S3cr37', function(err, decoded) {
        if (err) {
            return res.json({"error": true});
        }
        req.decoded = decoded;
        next();
    });
  } else {
      return res.status(403).send({
          "message": "Unauthorized"
      });
  }
}
