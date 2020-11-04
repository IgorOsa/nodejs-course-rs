const mongoose = require('mongoose');
const uuid = require('uuid');
const { hashPassword } = require('./../../common/hashHelpers');

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
  this.password = await hashPassword(this.password);
  next();
}

async function updateHashedPassword(next) {
  const docToUpdate = await this.model.findOne(this.getQuery());

  if (docToUpdate.password !== this._update.password) {
    const newPassword = await hashPassword(this._update.password);
    this._update.password = newPassword;
  }

  next();
}

// hash user password before saving into database
userSchema.pre('save', setHashedPassword);
userSchema.pre('findOneAndUpdate', updateHashedPassword);

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
