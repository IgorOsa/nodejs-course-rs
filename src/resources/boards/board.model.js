const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'Default board title',
    columns = [
      {
        id: uuid(),
        title: 'Sample column title #1',
        order: 0
      },
      {
        id: uuid(),
        title: 'Sample column title #2',
        order: 1
      },
      {
        id: uuid(),
        title: 'Sample column title #3',
        order: 2
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
