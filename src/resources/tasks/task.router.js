const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const wrap = require('../../common/asyncWrapper');

router.route('/').get(
  wrap(async (req, res) => {
    const tasks = await tasksService.getAll();
    res.json(tasks.map(Task.toResponse));
  })
);

router.route('/:id').get(
  wrap(async (req, res) => {
    const task = await tasksService.get(req.params.id);
    res.json(Task.toResponse(task));
  })
);

router.route('/').post(
  wrap(async (req, res) => {
    const { boardId } = req.params;
    const task = await tasksService.create(
      Task.fromRequest({ ...req.body, boardId })
    );
    res.json(Task.toResponse(task));
  })
);

router.route('/:id').put(
  wrap(async (req, res) => {
    const task = await tasksService.update(
      Task.fromRequest({
        id: req.params.id,
        boardId: req.params.boardId,
        ...req.body
      })
    );
    res.json(Task.toResponse(task));
  })
);

router.route('/:id').delete(
  wrap(async (req, res) => {
    const deleted = await tasksService.remove(Task.fromRequest(req.params));
    if (!deleted) res.status(404).send('Not found Error!');
    res.status(204).send('The task has been deleted');
  })
);

module.exports = router;
