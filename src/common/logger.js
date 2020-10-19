const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

morgan.token('body', req => {
  const reqBody = { ...req.body };
  delete reqBody.password;
  return JSON.stringify(reqBody);
});

morgan.token('params', req => {
  return JSON.stringify(req.params);
});

const logFormat = ':method :url :status params::params body::body [:date[iso]]';

const logToConsole = morgan(logFormat);

const logAccessFile = fs.createWriteStream(
  path.join(__dirname, './../../logs', 'access.log'),
  {
    flags: 'a',
    encoding: 'utf8'
  }
);

const logAccess = morgan(logFormat, {
  stream: logAccessFile
});

const logErrorFile = fs.createWriteStream(
  path.join(__dirname, './../../logs', 'error.log'),
  {
    flags: 'a',
    encoding: 'utf8'
  }
);

const logError = morgan(logFormat, {
  stream: logErrorFile,
  skip: (req, res) => res.statusCode < 500
});

module.exports = { logToConsole, logAccess, logError };
