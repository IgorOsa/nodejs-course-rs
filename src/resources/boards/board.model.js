const mongoose = require('mongoose');
const uuid = require('uuid');

const columnSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: String,
  order: Number
});

const Column = mongoose.model('Column', columnSchema);

const boardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: Array
  },
  {
    versionKey: false
  }
);

boardSchema.statics.fromRequest = body => {
  return new Board({
    title: body.title,
    columns: [...body.columns].map(x => new Column(x))
  });
};

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
