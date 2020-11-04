const mongoose = require('mongoose');
const Board = require('./../resources/boards/board.model');
const User = require('./../resources/users/user.model');
const { MONGO_CONNECTION_STRING } = require('./config');

const mockUsers = [
  new User({ name: 'admin', login: 'admin', password: 'admin' }),
  new User({ name: 'TEST_USER2', login: 'test_user2', password: 'p@sw0rd2' }),
  new User({ name: 'TEST_USER3', login: 'test_user3', password: 'p@sw0rd3' })
];

const mockBoards = [
  Board.fromRequest({
    title: 'Sample board#1',
    columns: [
      { title: 'Backlog', order: 1 },
      { title: 'Sprint', order: 2 }
    ]
  }),
  Board.fromRequest({
    title: 'Sample board#2',
    columns: [
      { title: 'Backlog', order: 1 },
      { title: 'Sprint', order: 2 }
    ]
  }),
  Board.fromRequest({
    title: 'Sample board#3',
    columns: [
      { title: 'Backlog', order: 1 },
      { title: 'Sprint', order: 2 }
    ]
  })
];

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB!');
    db.dropDatabase();
    mockUsers.forEach(user => user.save());
    mockBoards.forEach(board => board.save());
    cb();
  });
};

module.exports = { connectToDB };
