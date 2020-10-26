const User = require('./user.model');
const NOT_FOUND_ERROR = require('./../../common/errors');

const getAll = async () => {
  return User.find({}, (err, data) => {
    if (err) {
      throw new NOT_FOUND_ERROR('No users found!');
    }
    return data;
  });
};

const get = async id => {
  const user = await User.findById({ _id: id }).exec();

  if (!user) {
    throw new NOT_FOUND_ERROR(`User with id ${id} was not found`);
  }

  return user;
};

const create = async user => User.create(user);

const update = async user => {
  const updatedUser = await User.findOneAndUpdate({ _id: user.id }, user);

  if (!updatedUser) {
    throw new NOT_FOUND_ERROR(`User with id: ${user.id} not found!`);
  }

  return updatedUser;
};

const remove = async id => {
  const deleted = await (await User.deleteOne({ _id: id })).deletedCount;
  if (!deleted) {
    throw new NOT_FOUND_ERROR(`User with id: ${id} not found!`);
  }
  return deleted;
};

module.exports = { getAll, get, create, update, remove };
