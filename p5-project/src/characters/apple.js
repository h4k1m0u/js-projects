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

  move(snake) {
    const coordsStr = snake.coords.map((coord) => `${coord.x},${coord.y}`);
    let xApple = 0;
    let yApple = 0;
    let coordStr = '';

    // avoid putting apples on tiles occupied by snake
    do {
      // align image top-left corner on the grid
      xApple = this.canvas.cell * this.p.int(this.p.random(this.canvas.width / this.canvas.cell));
      yApple = this.canvas.cell * this.p.int(this.p.random(this.canvas.height / this.canvas.cell));
      coordStr = `${xApple},${yApple}`;
    } while (coordsStr.indexOf(coordStr) !== -1);

    [this.x, this.y] = [xApple, yApple];
  }
}

export default Apple;
