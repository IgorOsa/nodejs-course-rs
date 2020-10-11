const DB = require('./../../common/inMemoryDb');

const getAll = async () => DB.getAllUsers();

const get = async id => {
  const user = await DB.getUser(id);

  if (!user) throw new Error(`User with id: ${id} not found!`);

  return user;
};

const create = async user => DB.createUser(user);

const update = async user => {
  if (get(user.id)) {
    return DB.updateUser(user);
  }
};

const remove = async id => {
  const user = await DB.getUser(id);

  if (!user) throw new Error(`User with id: ${id} not found!`);

  DB.removeUser(id);
};

module.exports = { getAll, get, create, update, remove };
