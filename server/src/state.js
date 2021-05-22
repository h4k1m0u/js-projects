const { canvas } = require('./constants');

const state = {
  snakePC: {
    coords: [
      {
        x: canvas.cellSize,
        y: canvas.cellSize,
      },
    ],
    speed: {
      x: 1,
      y: 0,
    },
  },
  snakeNPC: {
    coords: [
      {
        x: canvas.width - canvas.cellSize,
        y: canvas.height - canvas.cellSize,
      },
    ],
  },
  apple: {
    coord: {
      x: null,
      y: null,
    },
  },
  game: {
    score: 0,
    isPaused: false,
    isOver: false,
  },
};

module.exports = state;
