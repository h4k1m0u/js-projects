import p5 from 'p5';

// p5 in instance mode (namespacing) using closures
const sketch = (p) => {
  const screen = {
    width: 640,
    height: 480,
  };

  // circle properties
  const circle = {
    diameter: 30,
    color: '#f00',
    x: screen.width / 2,
    y: screen.height / 2,
    step: 30,
  };

  p.setup = () => {
    // init canvas
    p.createCanvas(screen.width, screen.height);
    p.noStroke();
  };

  p.draw = () => {
    // clear & re-draw red rectange
    p.background(127);
    p.fill(circle.color);
    p.circle(circle.x, circle.y, circle.diameter);

    // change color on mouse press
    if (p.mouseIsPressed) {
      circle.color = '#00f';
    } else {
      circle.color = '#f00';
    }
  };

  p.keyPressed = () => {
    // move circle using keyboard arrows
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
  };
};

const myp5 = new p5(sketch);
