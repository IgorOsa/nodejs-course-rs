const bcrypt = require('bcrypt');
const { DEFAULT_SALT_ROUNDS } = require('./config');

const hashPassword = async password => {
  const salt = await bcrypt.genSalt(DEFAULT_SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

const checkHashedPassword = async (password, hash) =>
  bcrypt.compare(password, hash);

module.exports = { checkHashedPassword, hashPassword };
