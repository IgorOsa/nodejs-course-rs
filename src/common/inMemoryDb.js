const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

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
  removeBoard
};
