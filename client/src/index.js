import p5 from 'p5';
import { io } from 'socket.io-client';

import pathApple from 'images/apple.png';
import Apple from 'modules/characters/apple';
import { canvas, fps } from 'modules/constants';
import Snake from 'modules/characters/snake';

// import style & images so webpack process them
import 'scss/style.scss';

/**
 * freeze/unfreeze new/join menu buttons
 *
 * @param player1Joined  Whether player1 has joined the game
 */
function toggleMenuButtons(player1Joined = true) {
  if (player1Joined) {
    document.getElementById('new-game').setAttribute('disabled', '');
    document.getElementById('join-game').removeAttribute('disabled');
  } else {
    document.getElementById('new-game').removeAttribute('disabled');
    document.getElementById('join-game').setAttribute('disabled', '');
  }
}

/**
 * Show or hide menu
 */
function toggleMenu(isShown = true) {
  if (isShown) {
    document.getElementById('menu').style.display = 'flex';
  } else {
    document.getElementById('menu').style.display = 'none';
  }
}

// connect to socket.io server (url passed from webpack)
const socket = io(serverURL); // eslint-disable-line no-undef
socket.on('connect', () => {
  console.log(`Connection to ${serverURL} with id: ${socket.id}`); // eslint-disable-line no-undef
});

// variables set by server
let apple = null;
let snakePC = null;
let snakeNPC = null;
let score = 0;
let game = {};
let player;

// unfreeze/freeze new/join game buttons on startup
toggleMenuButtons(false);

// p5 in instance mode (namespacing) using closures
const sketch = (p) => {
  let elementScore = null;

  // assets
  let imageApple = null;

  p.preload = () => {
    // load image sprites
    imageApple = p.loadImage(pathApple);
  };

  p.setup = () => {
    // put canvas inside main#game in html
    p.createCanvas(canvas.width, canvas.height);
    p.noStroke();

    // set fps
    p.frameRate(fps);

    // characters instances
    snakePC = new Snake(p, '#00f');
    snakeNPC = new Snake(p, '#000');
    apple = new Apple(p, imageApple);

    // score html element below canvas
    elementScore = p.createDiv(`<b>Score:</b> ${score}`);
    elementScore.parent('game');
  };

  p.draw = () => {
    // destroy canvas & display updated menu again
    if (game.isOver) {
      console.log('Game over');
      document.getElementById('game').innerHTML = '';
      p.noLoop();

      toggleMenu(true);
      toggleMenuButtons(false);
    }
    if (game.isPaused) {
      return;
    }

    // clear canvas
    p.background('#71a9d0');

    // draw sprites
    snakePC.draw();
    snakeNPC.draw();
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

// update state for snake/apple/score from server
socket.on('stateChange', (state) => {
  // player;
  snakePC.coords = state.snakePC.coords;
  snakeNPC.coords = state.snakeNPC.coords;
  apple.coord = state.apple.coord;
  score = state.game.score;
  game = state.game;
});

/* send request (from first player) to server to join game */
document.getElementById('new-game').addEventListener('click', () => {
  socket.emit('newGame');
});

/* freeze/unfreeze new/join menu buttons */
socket.on('updateMenuButtons', () => toggleMenuButtons(true));

/* hide menu for first player */
socket.on('hideMenu', () => toggleMenu(false));

/* start game loop on server */
document.getElementById('join-game').addEventListener('click', () => {
  socket.emit('joinGame');
});

/* start game on client */
socket.on('start', () => {
  const myp5 = new p5(sketch, document.getElementById('game'));
});
