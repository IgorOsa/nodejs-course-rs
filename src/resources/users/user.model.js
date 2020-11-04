const mongoose = require('mongoose');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const { DEFAULT_SALT_ROUNDS } = require('./../../common/config');

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

async function setHashedPassword(next) {
  this.password = await bcrypt.hash(this.password, DEFAULT_SALT_ROUNDS);
  next();
}

// hash user password before saving into database
userSchema.pre('save', setHashedPassword);

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
