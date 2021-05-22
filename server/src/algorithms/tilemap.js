#!/usr/bin/env node
const { canvas } = require('../constants');

/**
 * Find index of cell corresp. to pixel coordinates (x, y)
 *
 * @param x      Pixel coordinate x of upper-left corner of cell
 * @param y      Pixel coordinate y of upper-left corner of cell
 * @return cell  Index of cell with cell0 being at upper-left corner
 */
const getCellFromXY = (x, y) => {
  const cellX = x / canvas.cellSize;
  const cellY = y / canvas.cellSize;
  const cell = cellY * canvas.nCellsRow + cellX;

  return cell;
};

/**
 * Find pixel coordinates (x, y) from cell index
 *
 * @param cell    Index of cell with cell0 being at upper-left corner
 * @return {x,y}  Pixel coordinates of upper-left corner of cell
 */
const getXYFromCell = (cell) => {
  const cellX = cell % canvas.nCellsRow;
  const cellY = Math.floor(cell / canvas.nCellsRow);
  const x = cellX * canvas.cellSize;
  const y = cellY * canvas.cellSize;

  return { x, y };
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
  getXYFromCell,
  calculateAdjacencyMatrix,
};
