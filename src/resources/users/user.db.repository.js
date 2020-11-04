const User = require('./user.model');
const { NotFoundError } = require('./../../common/errors');

const getAll = async () => {
  return User.find({}, (err, data) => {
    if (err) {
      throw new NotFoundError('No users found!');
    }
    return data;
  });
};

const get = async id => {
  const user = await User.findById({ _id: id }).exec();

  if (!user) {
    throw new NotFoundError(`User with id ${id} was not found`);
  }

  return user;
};

const getByLogin = async login => User.findOne(login).exec();

const create = async user => User.create(user);

const update = async user => {
  const updatedUser = await User.findOneAndUpdate({ _id: user.id }, user);

  if (!updatedUser) {
    throw new NotFoundError(`User with id: ${user.id} not found!`);
  }

  return updatedUser;
};

const remove = async id => {
  const deleted = await (await User.deleteOne({ _id: id })).deletedCount;
  if (!deleted) {
    throw new NotFoundError(`User with id: ${id} not found!`);
  }
  return deleted;
};

module.exports = { getAll, get, getByLogin, create, update, remove };
