const { canvas } = require('../constants');

class Apple {
  constructor(stateApple) {
    this.coord = stateApple.coord;
    this.needsSpawn = true;
  }

  move(snake) {
    // wait till it's eaten before spawning it
    if (!this.needsSpawn) {
      return;
    }

    const coordsStr = snake.coords.map((coord) => `${coord.x},${coord.y}`);
    let coordStr = '';

    // find tiles not already occupied by snake
    do {
      // align image top-left corner on the grid
      this.coord.x = canvas.cell * Math.floor(Math.random() * (canvas.width / canvas.cell));
      this.coord.y = canvas.cell * Math.floor(Math.random() * (canvas.height / canvas.cell));
      coordStr = `${this.coord.x},${this.coord.y}`;
    } while (coordsStr.indexOf(coordStr) !== -1);

    this.needsSpawn = false;
  }
}

module.exports = Apple;
