const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const wrap = require('./../../utils/asyncWrapper');

router.route('/').get(
  wrap(async (req, res) => {
    const tasks = await tasksService.getAll();
    res.json(tasks);
  })
);

router.route('/:id').get(
  wrap(async (req, res) => {
    const task = await tasksService.get(req.params.id);
    res.json(task);
  })
);

router.route('/').post(
  wrap(async (req, res) => {
    const { boardId } = req.params;
    const task = await tasksService.create(new Task({ ...req.body, boardId }));
    res.json(task);
  })
);

router.route('/:id').put(
  wrap(async (req, res) => {
    const task = await tasksService.update({
      id: req.params.id,
      ...req.body
    });
    res.json(task);
  })
);

router.route('/:taskId').delete(
  wrap(async (req, res) => {
    await tasksService.remove(req.params.taskId);
    res.status(204).send('The task has been deleted');
  })
);

module.exports = router;
