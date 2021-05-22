const { canvas } = require('../constants');
const { getXYFromCell } = require('../algorithms/tilemap');

class Snake {
  /**
   * @param stateSnake  Initial coords and potentially speed of snake
   * @param isNPC       NPC snake move to target, PC uses speed as its direction
   */
  constructor(stateSnake, isNPC = false) {
    this.coords = stateSnake.coords;
    this.isDead = false;
    this.isNPC = isNPC;

    // NPC snake moves slower than PC (use counter)
    if (!this.isNPC) {
      this.speed = stateSnake.speed;
    }
  }

  /* getter for property head */
  get head() {
    // head of snake is last element of array
    return this.coords[this.coords.length - 1];
  }

  /* setter for property head */
  set head(position) {
    // head of snake is last element of array
    this.coords[this.coords.length - 1] = position;
  }

  /**
   * Move snake's head accord. to speed if PC, else move it to target.
   * Rest of snake (queue) follows its head
   *
   * @param cell  determines next position of head
   */
  move(cell = null) {
    // snake dies when wall is hit
    if (this.isHittingWall()) {
      this.isDead = true;
      return;
    }

    // destination cell mendatory for NPC snake
    if (this.isNPC && cell === null) {
      return;
    }

    // shift coords from smallest to largest index
    for (let i = 0; i < this.coords.length - 1; i += 1) {
      this.coords[i].x = this.coords[i + 1].x;
      this.coords[i].y = this.coords[i + 1].y;
    }

    // move snake's accord. to speed (PC) or move to target (NPC)
    if (!this.isNPC) {
      this.head.x += this.speed.x * canvas.cellSize;
      this.head.y += this.speed.y * canvas.cellSize;
    } else {
      this.head = getXYFromCell(cell);
    }
  }

  isHittingWall() {
    if (this.head.x === -canvas.cellSize || this.head.x === canvas.width ||
        this.head.y === -canvas.cellSize || this.head.y === canvas.height) {
      return true;
    }

    return false;
  }

  eat(apple) {
    // add new rectangle to snake
    this.coords.push({
      x: apple.coord.x,
      y: apple.coord.y,
    });
  }

  intersects(apple) {
    // checks for collision between snake head & apple
    if (this.head.x === apple.coord.x && this.head.y === apple.coord.y) {
      this.eat(apple);
      return true;
    }

    return false;
  }
}

module.exports = Snake;
