const { canvas } = require('../constants');

class Snake {
  constructor(stateSnake) {
    this.coords = stateSnake.coords;
    this.speed = stateSnake.speed;
    this.isDead = false;
  }

  get head() {
    // head of snake is last element of array
    return this.coords[this.coords.length - 1];
  }

  move() {
    // snake dies when wall is hit
    if (this.isHittingWall()) {
      this.isDead = true;
      return;
    }

    // shift coords from smallest to largest index
    for (let i = 0; i < this.coords.length - 1; i += 1) {
      this.coords[i].x = this.coords[i + 1].x;
      this.coords[i].y = this.coords[i + 1].y;
    }

    // move snake's head by one tile cell
    this.head.x += this.speed.x * canvas.cell;
    this.head.y += this.speed.y * canvas.cell;
  }

  isHittingWall() {
    if (this.head.x === -canvas.cell || this.head.x === canvas.width ||
        this.head.y === -canvas.cell || this.head.y === canvas.height) {
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
