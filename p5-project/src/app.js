import p5 from 'p5';
import {
  canvas, circle, apple, fps,
} from './constants';

// p5 in instance mode (namespacing) using closures
const sketch = (p) => {
  let imageApple = null;
  let isColliding = false;
  let score = 0;

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

    // move sprite to new location & reset check for collision
    if (p.frameCount % (2 * fps) === 0) {
      apple.x = p.random(canvas.width);
      apple.y = p.random(canvas.height);

      isColliding = false;
    }
    p.image(imageApple, apple.x, apple.y);

    // change circle color on mouse press
    if (p.mouseIsPressed) {
      circle.color = '#00f';
    } else {
      circle.color = '#f00';
    }

    // move circle using keyboard arrows
    if (p.keyIsDown(p.LEFT_ARROW) && circle.x > circle.radius) {
      circle.x -= circle.step;
    } else if (p.keyIsDown(p.RIGHT_ARROW) && circle.x < canvas.width - circle.radius) {
      circle.x += circle.step;
    } else if (p.keyIsDown(p.UP_ARROW) && circle.y > circle.radius) {
      circle.y -= circle.step;
    } else if (p.keyIsDown(p.DOWN_ARROW) && circle.y < canvas.height - circle.radius) {
      circle.y += circle.step;
    }

    // check for collision only once between PC & NPC
    const coordCircle = p.createVector(circle.x, circle.y);
    const coordApple = p.createVector(apple.centerX, apple.centerY);
    const distance = coordCircle.dist(coordApple);
    if (!isColliding && distance < 2 * circle.radius) {
      isColliding = true;
      score += 1;
      console.log('Score:', score);
    }
  };

  p.keyPressed = () => {
    // show final score
    if (p.key === 'q' || p.keyCode === p.ESCAPE) {
      console.log('Final Score:', score);
    }
  };
};

const myp5 = new p5(sketch);
