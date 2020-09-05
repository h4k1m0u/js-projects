class Apple {
  constructor(path, x, y) {
    this.path = path;
    this.x = x;
    this.y = y;
    this.size = 24;
  }

  get centerX() {
    return this.x + this.size;
  }

  get centerY() {
    return this.y + this.size;
  }

  get radius() {
    return this.size / 2;
  }
}

export default Apple;
