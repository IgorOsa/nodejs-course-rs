const notFoundError = require('./errors');

const handleErrors = (err, req, res, next) => {
  if (err instanceof notFoundError) {
    res.status(err.status).send(err.message);
  } else if (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
  next();
};

module.exports = handleErrors;
