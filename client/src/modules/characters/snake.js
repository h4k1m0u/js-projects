import { canvas } from 'modules/constants';

/**
 * For snake's logic, see the same class in the server
 */
class Snake {
  constructor(p, colorHead) {
    this.p = p;
    this.colorHead = colorHead;
    this.coords = [];
  }

  draw() {
    // draw snake using p5 rectangles
    this.coords.forEach((coord, iCoord, arr) => {
      if (iCoord === arr.length - 1) {
        this.p.fill(this.colorHead);
      } else {
        this.p.fill('#fff');
      }

      this.p.stroke('#fff');
      this.p.rect(coord.x, coord.y, canvas.cellSize, canvas.cellSize);
    });
  }
}

export default Snake;
