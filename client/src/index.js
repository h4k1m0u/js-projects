import p5 from 'p5';
import { io } from 'socket.io-client';

import Snake from 'modules/characters/snake';
import Apple from 'modules/characters/apple';
import { FPS } from 'modules/constants';

// import style & images so webpack process them
import 'scss/style.scss';
import pathApple from 'images/apple.png';

// p5 in instance mode (namespacing) using closures
const sketch = (p) => {
  let score = 0;
  let timer = 0;
  let isPaused = false;

  const canvas = {
    width: 480,
    height: 480,
    cell: 24,
  };

  let apple = null;
  let snake = null;
  let elementScore = null;

  let socket = null;

  // assets
  let imageApple = null;

  p.preload = () => {
    // load image sprites
    imageApple = p.loadImage(pathApple);
  };

  p.setup = () => {
    // init canvas
    p.createCanvas(canvas.width, canvas.height);
    p.noStroke();

    // set fps
    p.frameRate(FPS);

    // characters instances
    snake = new Snake(p);
    apple = new Apple(p, imageApple);
    // apple.move(snake);

    // score html element below canvas
    elementScore = p.createDiv('<b>Score:</b> 0');

    // connect to socket.io server
    socket = io('http://localhost:3000');
    socket.on('connect', () => {
      console.log(`Connection with id: ${socket.id}`);
    });

    // update snake speed (direction) when state received from server
    socket.on('stateChange', (state) => {
      snake.speed = state.snake.speed;
      snake.coords = state.snake.coords;
    });
  };

  p.draw = () => {
    console.log('snake.coords ', snake.coords);
    if (isPaused) {
      return;
    }

    timer += 1;

    // movement of snake with retro vibe (limit speed)
    if (p.frameCount % 5 === 0) {
      // snake.move();
    }

    /*
    if (!snake.isDead) {
    */

    // clear canvas
    p.background('#71a9d0');

    // move apple to new location every 5s & reset check for collision
    if (timer === (5 * FPS)) {
      // apple.move(snake);
      timer = 0;
    }

    // draw sprites
    snake.draw();
    apple.draw();

    // change snake color on mouse press
    if (p.mouseIsPressed) {
      snake.color = '#00f';
    } else {
      snake.color = '#fff';
    }

    /*
    // check for collision between PC & NPC
    if (snake.intersects(apple)) {
      score += 1;
      elementScore.html(`<b>Score:</b> ${score}`);

      // move apple to random position on collision
      apple.move(snake);
      timer = 0;
    }
    */

    /*
    } else {
      // snake died from hitting the wall
      elementScore.html(`<b>Final score:</b> ${score}`);
    }
    */
  };

  p.keyPressed = () => {
    // notify server about key pressed
    switch (p.keyCode) {
      case p.LEFT_ARROW:
      case p.RIGHT_ARROW:
      case p.UP_ARROW:
      case p.DOWN_ARROW:
        socket.emit('keyPress', p.keyCode);
        break;
      case p.ESCAPE:
        snake.isDead = true;
        elementScore.html(`<b>Final score:</b> ${score}`);
        break;
      case p.ENTER:
        isPaused = !isPaused;
        break;
      default:
        break;
    }
  };
};

const myp5 = new p5(sketch);
