const { canvas } = require('./constants');

const state = {
  snake: {
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
};

module.exports = state;
