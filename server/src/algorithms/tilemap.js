#!/usr/bin/env node
const { canvas } = require('../constants');

/**
 * Find index of cell corresp. to pixel coordinates (x, y)
 *
 * @param x      Pixel coordinate x
 * @param y      Pixel coordinate y
 * @return cell  Index of cell with cell0 being at upper-left corner
 */
const getCellFromXY = (x, y) => {
  const nCellsRow = canvas.width / canvas.cellSize;
  const cellX = x / canvas.cellSize;
  const cellY = y / canvas.cellSize;
  const cell = cellY * nCellsRow + cellX;

  return cell;
};

/**
 * Generate adjacency graph for tilemap cells
 *
 * @param  nCellsRow        Number of cells per row in tilemap
 * @param  nCellsCol        Number of cells per column in tilemap
 * @return adjacencyMatrix  Adjacency matrix (key: tilemap cell, value: neighboring cells)
 */
const calculateAdjacencyMatrix = (nCellsRow, nCellsCol) => {
  const adjacencyMatrix = new Map();
  const nCells = nCellsRow * nCellsCol;

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

      adjacencyMatrix.set(iCell, neighbors);
    }
  }

  return adjacencyMatrix;
};

module.exports = {
  getCellFromXY,
  calculateAdjacencyMatrix,
};
