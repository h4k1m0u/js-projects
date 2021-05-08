class Snake {
  constructor(p, canvas, cellSize) {
    this.p = p;
    this.canvas = canvas;
    this.cellSize = cellSize;
    this.color = '#fff';

    this.xspeed = 1;
    this.yspeed = 0;

    this.coords = [];
    this.coords[0] = p.createVector(cellSize, canvas.height / 2);

    this.isDead = false;
  }

  get head() {
    // head of snake is last element of array
    return this.coords[this.coords.length - 1];
  }

  draw() {
    // draw snake using p5 rectangles
    this.coords.forEach((coord, iCoord, arr) => {
      if (iCoord === arr.length - 1) {
        this.p.fill('#d0c871');
      } else {
        this.p.fill(this.color);
      }

      this.p.stroke('#d09871');
      this.p.rect(coord.x, coord.y, this.cellSize, this.cellSize);
    });
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
    this.head.x += this.xspeed * this.canvas.cell;
    this.head.y += this.yspeed * this.canvas.cell;
  }

  isHittingWall() {
    if (this.head.x === 0 || this.head.x === this.canvas.width - this.canvas.cell ||
        this.head.y === 0 || this.head.y === this.canvas.height - this.canvas.cell) {
      return true;
    }

    return false;
  }

  turnLeft() {
    if (this.xspeed !== 1) {
      [this.xspeed, this.yspeed] = [-1, 0];
    }
  }

  turnRight() {
    if (this.xspeed !== -1) {
      [this.xspeed, this.yspeed] = [1, 0];
    }
  }

  turnUp() {
    if (this.yspeed !== 1) {
      [this.xspeed, this.yspeed] = [0, -1];
    }
  }

  turnDown() {
    if (this.yspeed !== -1) {
      [this.xspeed, this.yspeed] = [0, 1];
    }
  }

  eat(apple) {
    // add new rectangle to snake
    this.coords.push(this.p.createVector(apple.x, apple.y));
  }

  intersects(apple) {
    let isColliding = false;

    // checks for collision between snake head & apple
    if (this.head.x === apple.x && this.head.y === apple.y) {
      this.eat(apple);
      isColliding = true;
    }

    return isColliding;
  }
}

export default Snake;
