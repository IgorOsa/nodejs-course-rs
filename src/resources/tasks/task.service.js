const tasksRepo = require('./task.db.repository');

const getAll = () => tasksRepo.getAll();

const get = id => tasksRepo.get(id);

const create = task => tasksRepo.create(task);

const update = task => tasksRepo.update(task);

const remove = params => tasksRepo.remove(params);

const unAssignTaskFromUser = id => tasksRepo.unAssignTaskFromUser(id);

const removeTasksByBoardId = id => tasksRepo.removeTasksByBoardId(id);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  unAssignTaskFromUser,
  removeTasksByBoardId
};
