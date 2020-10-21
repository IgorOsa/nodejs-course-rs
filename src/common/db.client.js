const mongoose = require('mongoose');
const User = require('./../resources/users/user.model');
const { MONGO_CONNECTION_STRING } = require('./config');

const mockUsers = [
  new User({ name: 'TEST_USER1', login: 'test_user1', password: 'p@sw0rd1' }),
  new User({ name: 'TEST_USER2', login: 'test_user2', password: 'p@sw0rd2' }),
  new User({ name: 'TEST_USER3', login: 'test_user3', password: 'p@sw0rd3' })
];

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB!');
    db.dropDatabase();
    mockUsers.forEach(user => user.save());
    cb();
  });
};

module.exports = { connectToDB };
