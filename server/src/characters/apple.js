const { canvas } = require('../constants');

class Apple {
  constructor() {
    this.coord = {
      x: 0,
      y: 0,
    };
    this.needsSpawn = true;
  }

  /**
   * Spawn an apple in a cell inoccupied by PC and NPC snakes
   *
   * @param snakes  Array of snakes present on canvas
   */
  move(snakes) {
    // wait for apple to be eaten
    if (!this.needsSpawn) {
      return;
    }

    let coordsStr = [];
    for (let iSnake = 0; iSnake < snakes.length; iSnake += 1) {
      const coordsSnakeStr = snakes[iSnake].coords.map((coord) => `${coord.x},${coord.y}`);
      coordsStr = coordsStr.concat(coordsSnakeStr);
    }

    // find tiles not already occupied by snakes
    let coordStr = '';
    do {
      // align image top-left corner on the grid
      this.coord.x = canvas.cellSize * Math.floor(Math.random() * canvas.nCellsRow);
      this.coord.y = canvas.cellSize * Math.floor(Math.random() * canvas.nCellsCol);
      coordStr = `${this.coord.x},${this.coord.y}`;
    } while (coordsStr.indexOf(coordStr) !== -1);

    this.needsSpawn = false;
  }
}

module.exports = Apple;
