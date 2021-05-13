import p5 from 'p5';
import { io } from 'socket.io-client';

import Snake from 'modules/characters/snake';
import Apple from 'modules/characters/apple';
import { FPS } from 'modules/constants';

// import style & images so webpack process them
import 'scss/style.scss';
import pathApple from 'images/apple.png';

// connect to socket.io server
const socket = io('http://localhost:3000');
socket.on('connect', () => {
  console.log(`Connection with id: ${socket.id}`);
});

// p5 in instance mode (namespacing) using closures
const sketch = (p) => {
  const canvas = {
    width: 480,
    height: 480,
    cell: 24,
  };
  let elementScore = null;

  // variables set by server
  let apple = null;
  let snake0 = null,
      snake1 = null;
  let score = 0;
  let game = {};
  let player;

  // assets
  let imageApple = null;

  p.preload = () => {
    // load image sprites
    imageApple = p.loadImage(pathApple);
  };

  p.setup = () => {
    // put canvas inside main#game in html
    const renderer = p.createCanvas(canvas.width, canvas.height);
    renderer.parent('game');
    p.noStroke();

    // set fps
    p.frameRate(FPS);

    // characters instances
    snake0 = new Snake(p);
    snake1 = new Snake(p);
    apple = new Apple(p, imageApple);

    // score html element below canvas
    elementScore = p.createDiv(`<b>Score:</b> ${score}`);

    // update state for snake/apple/score from server
    socket.on('stateChange', (state) => {
      // player;
      [snake0.coords, snake0.speed] = [state.snakes[0].coords, state.snakes[0].speed];
      [snake1.coords, snake1.speed] = [state.snakes[1].coords, state.snakes[1].speed];
      apple.coord = state.apple.coord;
      score = state.game.score;
      game = state.game;
    });
  };

  p.draw = () => {
    // p.createButton("Button label", "Button value");

    if (game.isOver || game.isPaused) {
      return;
    }

    // clear canvas
    p.background('#71a9d0');

    // draw sprites
    snake0.draw();
    snake1.draw();
    apple.draw();

    // show score
    elementScore.html(`<b>Score:</b> ${score}`);
  };

  p.keyPressed = () => {
    // notify server about key pressed
    switch (p.keyCode) {
      case p.LEFT_ARROW:
      case p.RIGHT_ARROW:
      case p.UP_ARROW:
      case p.DOWN_ARROW:
      case p.ENTER:
      case p.ESCAPE:
        socket.emit('keyPress', p.keyCode);
        break;
      default:
        break;
    }
  };
};

// menu buttons events listeners
document.getElementById("new-game").addEventListener('click', onNewGame);
document.getElementById("join-game").addEventListener('click', onJoinGame);

function onNewGame() {
  // hide menu & show game canvas
  document.getElementById("menu").style.display = 'none';
  const myp5 = new p5(sketch);

  // notify server about player0 joining game
  socket.emit('newGame');
}

function onJoinGame() {
  // hide menu & show game canvas
  document.getElementById("menu").style.display = 'none';
  const myp5 = new p5(sketch);

  // notify server about player1 joining game
  socket.emit('joinGame');
}
