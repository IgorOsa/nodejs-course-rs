const User = require('../resources/users/user.model');

const DB = [];

DB.push(new User(), new User(), new User());

const getAllUsers = async () => {
  return [...DB];
};

const getUser = async id => DB.filter(el => el.id === id)[0];

const createUser = async user => {
  DB.push(user);
  return await getUser(user.id);
};

const updateUser = async user => {
  const targetUser = DB.find(el => el.id === user.id);

  Object.assign(targetUser, user);

  return await getUser(user.id);
};

const removeUser = async id => {
  const userIndex = DB.findIndex(user => user.id === id);

  if (userIndex !== -1) {
    DB.splice(userIndex, 1);
  }
};

module.exports = { getAllUsers, getUser, createUser, updateUser, removeUser };
