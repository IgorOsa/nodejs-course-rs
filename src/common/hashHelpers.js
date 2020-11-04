const bcrypt = require('bcrypt');

const checkHashedPassword = async (password, hash) =>
  bcrypt.compare(password, hash);

module.exports = { checkHashedPassword };
