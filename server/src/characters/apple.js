const { canvas } = require('../constants');

class Apple {
  constructor(stateApple) {
    this.coord = stateApple.coord;
    this.needsSpawn = true;
  }

  /**
   * Spawn an apple in a cell inoccupied by PC and NPC snakes
   *
   */
  move(snake) {
    // wait till apple is eaten before spawning it
    if (!this.needsSpawn) {
      return;
    }

    const coordsStr = snake.coords.map((coord) => `${coord.x},${coord.y}`);
    let coordStr = '';
    const nCellsRow = canvas.width / canvas.cellSize;
    const nCellsCol = canvas.height / canvas.cellSize;

    // find tiles not already occupied by snake
    do {
      // align image top-left corner on the grid
      this.coord.x = canvas.cellSize * Math.floor(Math.random() * nCellsRow);
      this.coord.y = canvas.cellSize * Math.floor(Math.random() * nCellsCol);
      coordStr = `${this.coord.x},${this.coord.y}`;
    } while (coordsStr.indexOf(coordStr) !== -1);

    this.needsSpawn = false;
  }
}

module.exports = Apple;
