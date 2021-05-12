import React, { useCallback, useState, useRef } from "react";
import "./App.css";
import produce from "immer";
import Button from "./components/Button";
import Wrapper from "./components/Wrapper";
import Grid from "./components/Grid";

// import Game from "../src/components/Game"

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

// create empty grid with dead cells
const createEmptyGrid = () => {
  //initialize the grid only once
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

// random pattern
const randomPattern = () => {
  const grid = [];
  for (let i = 0; i < numRows; i++) {
    grid.push(Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0)));
  }
  return grid;
};

const simulation = (grid) => {
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

function App() {
  const [grid, setGrid] = useState(() => {
    return createEmptyGrid();
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => simulation(g));

    setTimeout(runSimulation, 100);
  }, []);

  return (
    <Wrapper>
      <Button
        onClickFn={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
        }}
        name={running ? "Stop" : "start"}
      />
      <Button
        onClickFn={() => {
          setGrid(randomPattern);
        }}
        name={"Randomise"}
      />
      <Button
        onClickFn={() => {
          setGrid(createEmptyGrid());
        }}
        name={"Clear"}
      />
      <Grid>
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              // className={grid[i][j] ? "CellTurquoise" : "CellWhite"}
              key={`${i}-${j}`}
              onClick={() => {
                // user click
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][j] = grid[i][j] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
            />
          ))
        )}
      </Grid>
    </Wrapper>
  );
}

export default App;
//plan for tomorow:
/* - button component;
- grid component
*/
//plan:
/*
1. generate empty grid, provide a 3x3 
2. Randomise the live cells with Random button 
3. a new button to play and implement the 4 rules
*/

/* MLP
2. user can click random cells (making them alive from dead)
*/
