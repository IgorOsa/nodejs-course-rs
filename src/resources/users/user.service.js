const usersRepo = require('./user.db.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const getByLogin = login => usersRepo.getByLogin(login);

const create = user => usersRepo.create(user);

const update = user => usersRepo.update(user);

const remove = async id => {
  await taskService.unAssignTaskFromUser(id);
  return usersRepo.remove(id);
};

module.exports = { getAll, get, getByLogin, create, update, remove };
