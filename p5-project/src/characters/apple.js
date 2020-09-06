class Apple {
  constructor(p, canvas, path) {
    this.p = p;
    this.canvas = canvas;
    this.path = path;
    this.size = 24;
  }

  get radius() {
    return this.size / 2;
  }

  get centerX() {
    return this.x + this.radius;
  }

  get centerY() {
    return this.y + this.radius;
  }

  move() {
    // align image top-left corner on the grid
    this.x = this.canvas.cell * this.p.int(this.p.random(this.canvas.width / this.canvas.cell));
    this.y = this.canvas.cell * this.p.int(this.p.random(this.canvas.height / this.canvas.cell));
  }
}

export default Apple;
