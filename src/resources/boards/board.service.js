const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('./../tasks/task.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = board => boardsRepo.create(board);

const update = board => boardsRepo.update(board);

const remove = async id => {
  await tasksRepo.removeTasksByBoardId(id);
  await boardsRepo.remove(id);
};

module.exports = { getAll, get, create, update, remove };
