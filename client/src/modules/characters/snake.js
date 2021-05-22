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

  /**
   * Draw snake using p5 rectangles
   * Head distinguished from other parts by its contour
   */
  draw() {
    this.coords.forEach((coord, iCoord, arr) => {
      if (iCoord === arr.length - 1) {
        this.p.stroke('#fff');
      } else {
        this.p.stroke(this.colorHead);
      }

      this.p.fill(this.colorHead);
      this.p.rect(coord.x, coord.y, canvas.cellSize, canvas.cellSize);
    });
  }
}

export default Snake;
