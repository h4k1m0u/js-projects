// constants
const canvas = {
  width: 640,
  height: 480,
};

const circle = {
  diameter: 24,
  color: '#f00',
  x: canvas.width / 2,
  y: canvas.height / 2,
  step: 10,
  get radius() { return this.diameter / 2; },
};

const apple = {
  path: 'images/apple.png',
  x: 0,
  y: 0,
  size: 24,
  get centerX() { return this.x + this.size; },
  get centerY() { return this.y + this.size; },
  get radius() { return this.size / 2; },
};

const fps = 60;

export {
  canvas,
  circle,
  apple,
  fps,
};
