import React from "react"

// Globals
const numRows = 10;
const numCols = 10;

// Operations
const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

// // create empty grid with dead cells
export function CreateEmptyGrid() {
  //initialize the grid only once
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

// random pattern
export function RandomPattern() {
  const grid = [];
  for (let i = 0; i < numRows; i++) {
    grid.push(Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0)));
  }
  return grid;
};

export function Simulation(grid){
  // Spread doesn't work here. Clone multidimensional array
  let gridCopy = JSON.parse(JSON.stringify(grid));
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      // computes neighbors
      let neighbors = 0;
      operations.forEach(([x, y]) => {
        const newI = i + x;
        const newJ = j + y;
        // check bounds
        if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
          neighbors += grid[newI][newJ];
        }
      });

      if (neighbors < 2 || neighbors > 3) {
        // fewer than 2 and more than 3 dies
        gridCopy[i][j] = 0;
      } else if (grid[i][j] === 0 && neighbors === 3) {
        // dead cell with 3 neighbours becomes alive
        gridCopy[i][j] = 1;
      }
    }
  }
  return gridCopy;
};