class Apple {
  constructor(p, image) {
    this.p = p;
    this.image = image;
  }

  draw(x, y) {
    // draw apple using p5 image
    this.p.image(this.image, x, y);
  }
}

export default Apple;
