const DB = require('./../../common/inMemoryDb');

const getAll = async () => DB.getAllBoards();

const get = async id => {
  const board = await DB.getBoard(id);

  if (!board) throw new Error(`The board with id ${id} was not found`);

  return board;
};

const create = async board => DB.createBoard(board);

const update = async board => {
  if (get(board.id)) {
    return DB.updateBoard(board);
  }
};

const remove = async id => {
  const board = await DB.getBoard(id);

  if (!board) throw new Error(`Board with id: ${id} not found!`);

  DB.removeBoard(id);
};

module.exports = { getAll, get, create, update, remove };
