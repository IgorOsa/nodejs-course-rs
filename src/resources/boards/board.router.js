const router = require('express').Router();
const boardsService = require('./board.service');
const Board = require('./board.model');
const wrap = require('./../../utils/asyncWrapper');

router.route('/').get(
  wrap(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  })
);

router.route('/:id').get(
  wrap(async (req, res) => {
    const board = await boardsService.get(req.params.id);
    res.json(board);
  })
);

router.route('/').post(
  wrap(async (req, res) => {
    const board = await boardsService.create(new Board({ ...req.body }));
    res.json(board);
  })
);

router.route('/:id').put(
  wrap(async (req, res) => {
    const board = await boardsService.update({
      id: req.params.id,
      ...req.body
    });
    res.json(board);
  })
);

router.route('/:id').delete(
  wrap(async (req, res) => {
    await boardsService.remove(req.params.id);
    res.status(204).send('The board has been deleted');
  })
);

module.exports = router;
