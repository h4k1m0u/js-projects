const { canvas } = require('./constants');

const state = {
  snakes: [
    {
      coords: [
        {
          x: canvas.cell,
          y: canvas.cell,
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
          x: canvas.width - canvas.cell,
          y: canvas.height - canvas.cell,
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
