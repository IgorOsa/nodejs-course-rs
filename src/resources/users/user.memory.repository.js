const DB = require('./../../common/inMemoryDb');
const NOT_FOUND_ERROR = require('./../../common/errors');

const getAll = async () => DB.getAllUsers();

const get = async id => {
  const user = await DB.getUser(id);

  if (!user) throw new NOT_FOUND_ERROR(`User with id: ${id} not found!`);

  return user;
};

const create = async user => DB.createUser(user);

const update = async user => {
  if (get(user.id)) {
    return DB.updateUser(user);
  }

  throw new NOT_FOUND_ERROR(`Cannot update user with ${user.id}!`);
};

const remove = async id => {
  const user = await DB.getUser(id);

  if (!user) throw new NOT_FOUND_ERROR(`User with id: ${id} not found!`);

  DB.removeUser(id);
};

module.exports = { getAll, get, create, update, remove };
