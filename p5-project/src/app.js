import p5 from 'p5';

// p5 in instance mode (namespacing) using closures
const sketch = (p) => {
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
  };

  const apple = {
    path: 'images/apple.png',
    x: 0,
    y: 0,
  };

  const fps = 60;

  // image sprites
  let imageApple;

  p.setup = () => {
    // init canvas
    p.createCanvas(canvas.width, canvas.height);
    p.noStroke();

    // set fps
    p.frameRate(fps);

    // load image for sprites
    imageApple = p.loadImage(apple.path);
  };

  p.draw = () => {
    // clear & re-draw red rectange
    p.background(127);
    p.fill(circle.color);
    p.circle(circle.x, circle.y, circle.diameter);

    // move sprite to location every 2 seconds
    if (p.frameCount % (2 * fps) === 0) {
      apple.x = p.random(canvas.width);
      apple.y = p.random(canvas.height);
    }
    p.image(imageApple, apple.x, apple.y);

    // change circle color on mouse press
    if (p.mouseIsPressed) {
      circle.color = '#00f';
    } else {
      circle.color = '#f00';
    }

    // move circle using keyboard arrows
    if (p.keyIsDown(p.LEFT_ARROW)) {
      circle.x -= circle.step;
    } else if (p.keyIsDown(p.RIGHT_ARROW)) {
      circle.x += circle.step;
    } else if (p.keyIsDown(p.UP_ARROW)) {
      circle.y -= circle.step;
    } else if (p.keyIsDown(p.DOWN_ARROW)) {
      circle.y += circle.step;
    }
  };

  p.keyPressed = () => {
    // move circle using keyboard arrows
    /*
    switch (p.keyCode) {
      case p.LEFT_ARROW:
        circle.x -= circle.step;
        break;
      case p.RIGHT_ARROW:
        circle.x += circle.step;
        break;
      case p.UP_ARROW:
        circle.y -= circle.step;
        break;
      case p.DOWN_ARROW:
        circle.y += circle.step;
        break;
      default:
        break;
    }
    */
  };
};

const myp5 = new p5(sketch);
