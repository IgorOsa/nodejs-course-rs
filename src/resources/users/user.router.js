const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const wrap = require('../../utils/asyncWrapper');

router.route('/').get(
  wrap(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  wrap(async (req, res) => {
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
  })
);

router.route('/').post(
  wrap(async (req, res) => {
    const user = await usersService.create(
      new User({
        login: req.body.login,
        password: req.body.password,
        name: req.body.name
      })
    );
    res.json(User.toResponse(user));
  })
);

router.route('/:id').put(
  wrap(async (req, res) => {
    const user = await usersService.update({
      id: req.params.id,
      name: req.body.name,
      login: req.body.login
    });
    res.json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  wrap(async (req, res) => {
    await usersService.remove(req.params.id);
    res.status(204).send('The user has been deleted');
  })
);

module.exports = router;
