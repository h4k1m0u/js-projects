const { canvas } = require('./constants');

const state = {
  snakes: [
    {
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
    {
      coords: [
        {
          x: canvas.width - canvas.cellSize,
          y: canvas.height - canvas.cellSize,
        },
      ],
      speed: {
        x: -1,
        y: 0,
      },
    },
  ],
  apple: {
    coord: {
      x: 0,
      y: 0,
    },
  },
  game: {
    score: 0,
    isPaused: false,
    isOver: false,
  },
};

module.exports = state;
