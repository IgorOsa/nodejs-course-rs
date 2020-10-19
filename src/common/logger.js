const { appendFileSync, createWriteStream } = require('fs');
const path = require('path');
const morgan = require('morgan');

const exit = process.exit;

morgan.token('body', req => {
  const reqBody = { ...req.body };
  delete reqBody.password;
  return JSON.stringify(reqBody);
});

morgan.token('queryParams', req => {
  return JSON.stringify(req.query);
});

const logFormat =
  '[:date[iso]] :method :url :status queryParams::queryParams body::body';

const logToConsole = morgan(logFormat, {
  skip: (req, res) => res.statusCode < 500
});

const logAccessFile = createWriteStream(
  path.join(__dirname, './../../logs', 'access.log'),
  {
    flags: 'a',
    encoding: 'utf8'
  }
);

const logAccess = morgan(logFormat, {
  stream: logAccessFile
});

const logErrorFile = createWriteStream(
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

const logProcessError = err => {
  console.error(err.stack);

  appendFileSync(
    path.join(__dirname, './../../logs', 'error.log'),
    `[${new Date().toLocaleString()}] - ${err.stack}\n`,
    {
      encoding: 'utf8'
    }
  );

  exit(1);
};

module.exports = { logToConsole, logAccess, logError, logProcessError };
