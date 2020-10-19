const DB = require('./../../common/inMemoryDb');
const NOT_FOUND_ERROR = require('./../../common/errors');

const getAll = async () => DB.getAllBoards();

const get = async id => {
  const board = await DB.getBoard(id);

  if (!board) {
    throw new NOT_FOUND_ERROR(`The board with id ${id} was not found`);
  }

  return board;
};

const create = async board => DB.createBoard(board);

const update = async board => {
  if (!get(board.id)) {
    throw new NOT_FOUND_ERROR(`Board with id: ${board.id} not found!`);
  }

  return await DB.updateBoard(board);
};

const remove = async id => {
  const board = await DB.getBoard(id);

  if (!board) throw new NOT_FOUND_ERROR(`Board with id: ${id} not found!`);

  DB.removeBoard(id);
};

module.exports = { getAll, get, create, update, remove };
