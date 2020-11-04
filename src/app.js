const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const loginRouter = require('./resources/login/login.router');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const logger = require('./common/logger');
const handleErrors = require('./common/errorHandler');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(logger.logToConsole);
app.use(logger.logAccess);
app.use(logger.logError);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use(handleErrors);

process.on('uncaughtException', (req, res, route, err) =>
  logger.logProcessError(req, res, route, err)
);
process.on('unhandledRejection', (req, res, route, err) =>
  logger.logProcessError(req, res, route, err)
);

// throw Error('Oops!');

// Promise.reject(Error('Oops!'));

module.exports = app;
