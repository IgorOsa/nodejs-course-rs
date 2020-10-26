const mongoose = require('mongoose');
const uuid = require('uuid');

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    name: String,
    login: String,
    password: String
  },
  {
    collection: 'users',
    versionKey: false
  }
);

userSchema.statics.fromRequest = req => {
  const { id } = req.params;
  const { login, password, name } = req.body;
  return new User({ _id: id, login, password, name });
};

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
