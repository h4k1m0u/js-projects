class Apple {
  constructor(p, canvas, image) {
    this.p = p;
    this.canvas = canvas;
    this.image = image;
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

  draw() {
    // draw apple using p5 image
    this.p.image(this.image, this.x, this.y);
  }

  move() {
    // align image top-left corner on the grid
    this.x = this.canvas.cell * this.p.int(this.p.random(this.canvas.width / this.canvas.cell));
    this.y = this.canvas.cell * this.p.int(this.p.random(this.canvas.height / this.canvas.cell));
  }
}

export default Apple;
