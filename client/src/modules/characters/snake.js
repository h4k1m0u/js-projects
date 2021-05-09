import { canvas } from 'modules/constants';

/**
 * For snake's logic, see the same class in the server
 */
class Snake {
  constructor(p) {
    this.p = p;
    this.color = '#fff';
    this.coords = [];
  }

  draw() {
    // draw snake using p5 rectangles
    this.coords.forEach((coord, iCoord, arr) => {
      if (iCoord === arr.length - 1) {
        this.p.fill('#d0c871');
      } else {
        this.p.fill(this.color);
      }

      this.p.stroke('#d09871');
      this.p.rect(coord.x, coord.y, canvas.cell, canvas.cell);
    });
  }
}

export default Snake;
