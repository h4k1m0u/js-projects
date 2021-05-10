class Apple {
  constructor(p, image) {
    this.p = p;
    this.image = image;
    this.coord = {};
  }

  draw() {
    // draw apple using p5 image
    this.p.image(this.image, this.coord.x, this.coord.y);
  }
}

export default Apple;
