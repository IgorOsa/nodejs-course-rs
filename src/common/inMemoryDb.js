const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('./../resources/tasks/task.model');

// Users

const DB = [];

DB.push(new User(), new User(), new User());

const getAllUsers = async () => {
  return [...DB];
};

const getUser = async id => DB.filter(el => el.id === id)[0];

const createUser = async user => {
  DB.push(user);
  return await getUser(user.id);
};

const updateUser = async user => {
  const targetUser = DB.find(el => el.id === user.id);

  Object.assign(targetUser, user);

  return await getUser(user.id);
};

const removeUser = async id => {
  const userIndex = DB.findIndex(user => user.id === id);

  if (userIndex !== -1) {
    DB.splice(userIndex, 1);
  }
};

// Boards

const DB_BOARDS = [];

DB_BOARDS.push(new Board(), new Board(), new Board());

const getAllBoards = async () => {
  return [...DB_BOARDS];
};

const getBoard = async id => DB_BOARDS.filter(el => el.id === id)[0];

const createBoard = async board => {
  DB_BOARDS.push(board);
  return await getBoard(board.id);
};

const updateBoard = async board => {
  const targetBoard = DB_BOARDS.find(el => el.id === board.id);

  Object.assign(targetBoard, board);

  return await getBoard(board.id);
};

const removeBoard = async id => {
  const boardIndex = DB_BOARDS.findIndex(board => board.id === id);

  if (boardIndex !== -1) {
    DB_BOARDS.splice(boardIndex, 1);
  }
};

// Tasks

const DB_TASKS = [];

DB_TASKS.push(new Task(), new Task(), new Task());

const getAllTasks = async () => {
  return [...DB_TASKS];
};

const getTask = async id => DB_TASKS.filter(el => el.id === id)[0];

const createTask = async task => {
  DB_TASKS.push(task);
  return task;
};

const updateTask = async task => {
  const targetTask = DB_TASKS.find(el => el.id === task.id);

  Object.assign(targetTask, task);

  return await getUser(task.id);
};

const removeTask = async id => {
  const taskIndex = DB_TASKS.findIndex(task => task.id === id);

  if (taskIndex !== -1) {
    return DB_TASKS.splice(taskIndex, 1)[0];
  }

  return null;
};

const removeTasksByBoardId = async id => {
  const tasks = DB_TASKS.filter(task => task.boardId === id);

  if (tasks.length > 0) {
    tasks.forEach(task => removeTask(task.id));
  }

  return null;
};

const unAssignTaskUser = async id => {
  const tasks = DB_TASKS.filter(task => task.userId === id);

  if (tasks.length > 0) {
    tasks.forEach(task => (task.userId = null));
    return;
  }

  return null;
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard,
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  removeTask,
  removeTasksByBoardId,
  unAssignTaskUser
};
