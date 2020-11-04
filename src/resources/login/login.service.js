const usersRepo = require('./../users/user.service');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./../../common/config');
const { checkHashedPassword } = require('./../../common/hashHelpers');
const { AuthorizationError } = require('./../../common/errors');

const signIn = async ({ login, password }) => {
  const user = await usersRepo.getByLogin({ login });

  if (!user) {
    throw new AuthorizationError();
  }

  const { password: hashedPassword } = user;

  const comparisonRes = await checkHashedPassword(password, hashedPassword);

  if (comparisonRes) {
    const { _id } = user;
    const token = jwt.sign({ _id, login }, JWT_SECRET_KEY, {
      expiresIn: '30m'
    });
    return token;
  }

  throw new AuthorizationError();
};

module.exports = { signIn };
