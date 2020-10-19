const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = user => usersRepo.create(user);

const update = user => usersRepo.update(user);

const remove = async id => {
  await taskService.unAssignTaskFromUser(id);
  await usersRepo.remove(id);
};

module.exports = { getAll, get, create, update, remove };
