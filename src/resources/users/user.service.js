const tasksRepo = require('../tasks/task.memory.repository');
const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = user => usersRepo.create(user);

const update = user => usersRepo.update(user);

const remove = async id => {
  await tasksRepo.unAssignTaskUser(id);
  await usersRepo.remove(id);
};

module.exports = { getAll, get, create, update, remove };
