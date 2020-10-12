const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'Simple Task',
    order = 0,
    description = 'Task description',
    userId,
    columnId = null,
    boardId
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.columnId = columnId;
    this.boardId = boardId;
  }
}

module.exports = Task;
