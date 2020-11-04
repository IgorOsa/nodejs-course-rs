const router = require('express').Router();
const boardsService = require('./board.service');
const Board = require('./board.model');
const wrap = require('../../common/asyncWrapper');

router.route('/').get(
  wrap(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  wrap(async (req, res) => {
    const board = await boardsService.get(req.params.id);
    res.json(Board.toResponse(board));
  })
);

router.route('/').post(
  wrap(async (req, res) => {
    const board = await boardsService.create(Board.fromRequest(req.body));
    res.json(Board.toResponse(board));
  })
);

router.route('/:id').put(
  wrap(async (req, res) => {
    const board = await boardsService.update({
      id: req.params.id,
      ...req.body
    });
    res.json(Board.toResponse(board));
  })
);

router.route('/:id').delete(
  wrap(async (req, res) => {
    await boardsService.remove(req.params.id);
    res.status(204).send('The board has been deleted');
  })
);

module.exports = router;
