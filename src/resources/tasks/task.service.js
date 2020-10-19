const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const get = id => tasksRepo.get(id);

const create = task => tasksRepo.create(task);

const update = task => tasksRepo.update(task);

const remove = id => tasksRepo.remove(id);

const unAssignTaskFromUser = id => tasksRepo.unAssignTaskFromUser(id);

module.exports = { getAll, get, create, update, remove, unAssignTaskFromUser };
