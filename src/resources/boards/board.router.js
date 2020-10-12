const router = require('express').Router();
const boardsService = require('./board.service');
const Board = require('./board.model');

router.route('/').get(async (req, res) => {
  try {
    const boards = await boardsService.getAll();
    res.json(boards);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.json(board);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const board = await boardsService.create(new Board({ ...req.body }));
    res.json(board);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const board = await boardsService.update({
      id: req.params.id,
      ...req.body
    });
    res.json(board);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await boardsService.remove(req.params.id);
    res.status(204).send('The board has been deleted');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
