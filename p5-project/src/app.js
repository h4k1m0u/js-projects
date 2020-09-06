import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import Snake from './characters/snake';
import Apple from './characters/apple';

// p5 in instance mode (namespacing) using closures
const sketch = (p) => {
  let score = 0;
  const fps = 30;
  let timer = 0;

  const canvas = {
    width: 480,
    height: 480,
    cell: 24,
  };

  let apple = null;
  let snake = null;
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
    snake = new Snake(p, canvas, 24);
    apple = new Apple(p, canvas, 'images/apple.png');
    apple.move();

    // score html element
    elementScore = p.createDiv('Score = 0');
    elementScore.position(20, 20);

    // play background music
    music.loop();
  };

  p.draw = () => {
    timer += 1;

    // clear & re-draw moving PC
    p.background(127);
    snake.draw();

    // movement of snake with retro vibe (limit speed)
    if (p.frameCount % 5 === 0) {
      snake.move();
    }

    // move apple to new location every 5s & reset check for collision
    if (timer === (5 * fps)) {
      apple.move();
      timer = 0;
    }
    p.image(imageApple, apple.x, apple.y);

    // change snake color on mouse press
    if (p.mouseIsPressed) {
      snake.color = '#00f';
    } else {
      snake.color = '#fff';
    }

    // check for collision between PC & NPC
    if (snake.intersects(apple)) {
      score += 1;
      elementScore.html(`Score: ${score}`);

      // move apple to random position on collision
      apple.move();
      timer = 0;
    }
  };

  p.keyPressed = () => {
    // move snake using keyboard arrows
    switch (p.keyCode) {
      case p.LEFT_ARROW:
        snake.turnLeft(p);
        break;
      case p.RIGHT_ARROW:
        snake.turnRight(p);
        break;
      case p.UP_ARROW:
        snake.turnUp(p);
        break;
      case p.DOWN_ARROW:
        snake.turnDown(p);
        break;
      case p.ESCAPE:
        elementScore.html(`Final score: ${score}`);
        break;
      default:
        break;
    }
  };
};

const myp5 = new p5(sketch);
