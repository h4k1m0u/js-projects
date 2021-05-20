#!/usr/bin/env node
/* Generate adjacency graph for tilemap cells */
// const { canvas } = require('../constants');
const canvas = {
  width: 50,
  height: 50,
  cellSize: 10,
};

const [nCellsRow, nCellsCol] = [canvas.width / canvas.cellSize, canvas.height / canvas.cellSize];
const nCells = nCellsRow * nCellsCol;

const graph = new Map();

for (let iCellRow = 0; iCellRow < nCellsRow; iCellRow += 1) {
  for (let iCellCol = 0; iCellCol < nCellsCol; iCellCol += 1) {
    const iCell = iCellRow * nCellsRow + iCellCol;
    const neighbors = [];

    // neighbors on the four sides if they are in the tilemap
    if ((iCell + 1) % nCellsRow !== 0) {
      neighbors.push(iCell + 1);
    }
    if (iCell % nCellsRow !== 0) {
      neighbors.push(iCell - 1);
    }
    if (iCell - nCellsRow >= 0) {
      neighbors.push(iCell - nCellsRow);
    }
    if (iCell + nCellsRow < nCells) {
      neighbors.push(iCell + nCellsRow);
    }

    graph.set(iCell, neighbors);
  }
}

console.log('graph ', graph);
