const User = require('./user.model');

const getAll = async () => User.find({});

const get = async id => User.findById({ _id: id });

const create = async user => User.create(user);

const update = async user => User.updateOne({ _id: user.id }, user);

const remove = async id => User.deleteOne({ _id: id });

module.exports = { getAll, get, create, update, remove };
