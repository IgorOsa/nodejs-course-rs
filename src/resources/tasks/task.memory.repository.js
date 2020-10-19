const DB = require('./../../common/inMemoryDb');
const NOT_FOUND_ERROR = require('./../../common/errors');

const getAll = async () => DB.getAllTasks();

const get = async id => {
  const task = await DB.getTask(id);

  if (!task) throw new NOT_FOUND_ERROR(`Task with id: ${id} not found!`);

  return task;
};

const create = async task => DB.createTask(task);

const update = async task => {
  if (get(task.id)) {
    return DB.updateTask(task);
  }

  throw new NOT_FOUND_ERROR(`Cannot update task with ${task.id}!`);
};

const remove = async id => {
  const task = await DB.removeTask(id);

  if (!task) throw new NOT_FOUND_ERROR(`Task with id: ${id} not found!`);
};

const removeTasksByBoardId = async id => DB.removeTasksByBoardId(id);

const unAssignTaskFromUser = async id => DB.unAssignTaskFromUser(id);

module.exports = {
  getAll,
  get,
  removeTasksByBoardId,
  create,
  update,
  remove,
  unAssignTaskFromUser
};
