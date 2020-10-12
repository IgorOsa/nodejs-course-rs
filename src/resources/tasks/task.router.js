const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  try {
    const task = await tasksService.get(req.params.id);
    res.json(task);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { boardId } = req.params;

    const task = await tasksService.create(new Task({ ...req.body, boardId }));

    res.json(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const task = await tasksService.update({
      id: req.params.id,
      ...req.body
    });
    res.json(task);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:taskId').delete(async (req, res) => {
  try {
    await tasksService.remove(req.params.taskId);
    res.status(204).send('The task has been deleted');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
