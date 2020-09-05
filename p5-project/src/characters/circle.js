class Circle {
  constructor(diameter, x, y) {
    this.diameter = diameter;
    this.x = x;
    this.y = y;
    this.color = '#f00';
    this.speed = 10;
  }

  get radius() {
    return this.diameter / 2;
  }
}

export default Circle;
