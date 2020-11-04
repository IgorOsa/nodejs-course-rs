class NotFoundError extends Error {
  constructor(message = 'Not found') {
    super(message);
    this.status = '404';
  }
}

class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    this.status = '401';
  }
}

class AuthorizationError extends Error {
  constructor(message = 'Forbidden') {
    super(message);
    this.status = '403';
  }
}

module.exports = { NotFoundError, UnauthorizedError, AuthorizationError };
