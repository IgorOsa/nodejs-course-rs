const Task = require('./task.model');
const { NotFoundError } = require('./../../common/errors');

const getAll = async () => {
  return Task.find({}, (err, data) => {
    if (err) {
      throw new NotFoundError('No tasks found!');
    }
    return data;
  });
};

const get = async id => {
  const task = await Task.findById({ _id: id }).exec();

  if (!task) {
    throw new NotFoundError(`The task with id ${id} was not found`);
  }

  return task;
};

const create = async task => Task.create(task);

const update = async task => {
  const updatedTask = Task.findOneAndUpdate({ _id: task.id }, task);

  if (!updatedTask) {
    throw new NotFoundError(`Task with id: ${task.id} not found!`);
  }

  return updatedTask;
};

const remove = async params => {
  const { id, boardId } = params;
  const deleted = await (await Task.deleteOne({ _id: id, boardId }))
    .deletedCount;
  if (!deleted) {
    throw new NotFoundError(`Task with id: ${id} not found!`);
  }
  return deleted;
};

const removeTasksByBoardId = async boardId =>
  (await Task.deleteMany({ boardId })).ok;

const unAssignTaskFromUser = async userId =>
  (await Task.updateMany({ userId }, { userId: null })).ok;

module.exports = {
  getAll,
  get,
  removeTasksByBoardId,
  create,
  update,
  remove,
  unAssignTaskFromUser
};
