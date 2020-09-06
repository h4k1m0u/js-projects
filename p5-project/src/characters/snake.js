class Snake {
  constructor(p, canvas, cellSize) {
    this.p = p;
    this.canvas = canvas;
    this.cellSize = cellSize;
    this.color = '#fff';

    this.xspeed = 1;
    this.yspeed = 0;

    // head: last element of snake
    this.coords = [];
    this.coords[0] = p.createVector(canvas.width / 2, canvas.height / 2);
  }

  get head() {
    // head of snake is last element of array
    return this.coords[this.coords.length - 1];
  }

  draw() {
    // draw snake using p5 rectangles
    this.coords.forEach((coord) => {
      this.p.fill(this.color);
      this.p.stroke(127);
      this.p.rect(coord.x, coord.y, this.cellSize, this.cellSize);
    });
  }

  move() {
    // shift coords from smallest to largest index
    for (let i = 0; i < this.coords.length - 1; i += 1) {
      this.coords[i].x = this.coords[i + 1].x;
      this.coords[i].y = this.coords[i + 1].y;
    }

    // prevent snake from moving out of canvas
    this.head.x = this.p.constrain(this.head.x + this.xspeed * this.canvas.cell,
      0, this.canvas.width - this.cellSize);
    this.head.y = this.p.constrain(this.head.y + this.yspeed * this.canvas.cell,
      0, this.canvas.height - this.cellSize);
  }

  turnLeft() {
    [this.xspeed, this.yspeed] = [-1, 0];
  }

  turnRight() {
    [this.xspeed, this.yspeed] = [1, 0];
  }

  turnUp() {
    [this.xspeed, this.yspeed] = [0, -1];
  }

  turnDown() {
    [this.xspeed, this.yspeed] = [0, 1];
  }

  eat(apple) {
    // add new rectangle to snake
    this.coords.push(this.p.createVector(apple.x, apple.y));
  }

  intersects(apple) {
    let isColliding = false;

    // checks for collision between two rectangles
    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (this.head.x < apple.x + apple.size
        && this.head.x + this.cellSize > apple.x
        && this.head.y < apple.y + apple.size
        && this.head.y + this.cellSize > apple.y
    ) {
      this.eat(apple);
      isColliding = true;
    }

    return isColliding;
  }
}

export default Snake;
