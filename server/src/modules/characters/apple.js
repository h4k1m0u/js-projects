const { canvas } = require('../constants');

class Apple {
  constructor() {
    this.size = canvas.cell;
  }

  move(snake) {
    const coordsStr = snake.coords.map((coord) => `${coord.x},${coord.y}`);
    let coordStr = '';

    // find tiles not already occupied by snake
    do {
      // align image top-left corner on the grid
      this.x = canvas.cell * Math.floor(Math.random() * (canvas.width / canvas.cell));
      this.y = canvas.cell * Math.floor(Math.random() * (canvas.height / canvas.cell));
      coordStr = `${this.x},${this.y}`;
    } while (coordsStr.indexOf(coordStr) !== -1);
  }
}

module.exports = Apple;
