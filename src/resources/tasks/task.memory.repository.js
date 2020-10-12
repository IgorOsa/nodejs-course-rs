const DB = require('./../../common/inMemoryDb');

const getAll = async () => DB.getAllTasks();

const get = async id => {
  const task = await DB.getTask(id);

  if (!task) throw new Error(`Task with id: ${id} not found!`);

  return task;
};

const create = async task => DB.createTask(task);

const update = async task => {
  if (get(task.id)) {
    return DB.updateTask(task);
  }
};

const remove = async id => {
  const task = await DB.getTask(id);

  if (!task) throw new Error(`Task with id: ${id} not found!`);

  return await DB.removeTask(id);
};

const removeTasksByBoardId = async id => DB.removeTasksByBoardId(id);

module.exports = { getAll, get, removeTasksByBoardId, create, update, remove };
