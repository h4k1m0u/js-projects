class Snake {
  constructor(canvas, size) {
    this.canvas = canvas;
    this.size = size;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.color = '#fff';
    this.xspeed = 1;
    this.yspeed = 0;
  }

  move(p) {
    // prevent snake from moving out of canvas
    this.x = p.constrain(this.x + this.xspeed * this.canvas.cell,
      0, this.canvas.width - this.size);
    this.y = p.constrain(this.y + this.yspeed * this.canvas.cell,
      0, this.canvas.height - this.size);
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

  intersects(apple) {
    let isColliding = false;

    // checks for collision between two rectangles
    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (this.x < apple.x + apple.size
        && this.x + this.size > apple.x
        && this.y < apple.y + apple.size
        && this.y + this.size > apple.y
    ) {
      isColliding = true;
    }

    return isColliding;
  }
}

export default Snake;
