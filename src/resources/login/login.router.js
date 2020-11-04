const router = require('express').Router();
const loginService = require('./login.service');
const wrap = require('../../common/asyncWrapper');

router.route('/').post(
  wrap(async (req, res) => {
    const { login, password } = req.body;
    const token = await loginService.signIn({ login, password });
    res.json({ token });
  })
);

module.exports = router;
