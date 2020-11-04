const jwt = require('jsonwebtoken');
const wrap = require('./asyncWrapper');
const { JWT_SECRET_KEY } = require('./config');
const { UnauthorizedError } = require('./../common/errors');

module.exports = wrap(async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (authHeader !== undefined) {
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer') {
      throw new UnauthorizedError();
    }
    await jwt.verify(token, JWT_SECRET_KEY, err => {
      if (err) throw new UnauthorizedError();
    });
    return next();
  }
  throw new UnauthorizedError();
});
