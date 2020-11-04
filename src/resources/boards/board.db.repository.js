const Board = require('./board.model');
const { NotFoundError } = require('./../../common/errors');

const getAll = async () => {
  return Board.find({}, (err, data) => {
    if (err) {
      throw new NotFoundError('No boards found!');
    }
    return data;
  });
};

const get = async id => {
  const board = await Board.findById({ _id: id }).exec();

  if (!board) {
    throw new NotFoundError(`The board with id ${id} was not found`);
  }

  return board;
};

const create = async board => {
  return Board.create(board);
};

const update = async board => {
  const updatedBoard = await Board.findOneAndUpdate({ _id: board.id }, board);

  if (!updatedBoard) {
    throw new NotFoundError(`Board with id: ${board.id} not found!`);
  }

  return updatedBoard;
};

const remove = async id => {
  const deleted = (await Board.deleteOne({ _id: id })).deletedCount;
  if (!deleted) {
    throw new NotFoundError(`Board with id: ${id} not found!`);
  }
};

module.exports = { getAll, get, create, update, remove };
