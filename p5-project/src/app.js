import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import Circle from './characters/circle';
import Apple from './characters/apple';

// p5 in instance mode (namespacing) using closures
const sketch = (p) => {
  let score = 0;
  const fps = 60;
  let timer = 0;

  const canvas = {
    width: 640,
    height: 480,
  };

  let apple = null;
  let circle = null;
  let elementScore = null;

  // assets
  let imageApple = null;
  let music = null;

  p.preload = () => {
    // load music & sprite images
    imageApple = p.loadImage('images/apple.png');
    music = p.loadSound('sounds/cyberpunk-moonlight-sonata.mp3');
  };

  p.setup = () => {
    // init canvas
    p.createCanvas(canvas.width, canvas.height);
    p.noStroke();

    // set fps
    p.frameRate(fps);

    // characters instances
    apple = new Apple('images/apple.png', 0, 0);
    circle = new Circle(24, canvas.width / 2, canvas.height / 2);

    // score html element
    elementScore = p.createDiv('Score = 0');
    elementScore.position(20, 20);

    // play background music
    music.loop();
  };

  p.draw = () => {
    timer += 1;

    // clear & re-draw red rectange
    p.background(127);
    p.fill(circle.color);
    p.circle(circle.x, circle.y, circle.diameter);

    // move sprite to new location & reset check for collision
    if (timer === (2 * fps)) {
      apple.x = p.random(canvas.width);
      apple.y = p.random(canvas.height);
      timer = 0;
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
      circle.x -= circle.speed;
    } else if (p.keyIsDown(p.RIGHT_ARROW) && circle.x < canvas.width - circle.radius) {
      circle.x += circle.speed;
    } else if (p.keyIsDown(p.UP_ARROW) && circle.y > circle.radius) {
      circle.y -= circle.speed;
    } else if (p.keyIsDown(p.DOWN_ARROW) && circle.y < canvas.height - circle.radius) {
      circle.y += circle.speed;
    }

    // check for collision only once between PC & NPC
    const coordCircle = p.createVector(circle.x, circle.y);
    const coordApple = p.createVector(apple.centerX, apple.centerY);
    const distance = coordCircle.dist(coordApple);
    if (distance < 2 * circle.radius) {
      score += 1;
      elementScore.html(`Score: ${score}`);

      // move apple to random position on collision
      apple.x = p.random(canvas.width);
      apple.y = p.random(canvas.height);
      timer = 0;
    }
  };

  p.keyPressed = () => {
    // show final score
    if (p.key === 'q' || p.keyCode === p.ESCAPE) {
      elementScore.html(`Final score: ${score}`);
    }
  };
};

const myp5 = new p5(sketch);
