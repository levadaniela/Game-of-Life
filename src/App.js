import React, { useCallback, useState, useRef } from "react";
import "./App.css";
import produce from "immer";

function App() {
  //default rows and coloumns for our grid
  const numRows = 10;
  const numCols = 10;

  //possible moves with neigbors
  const availableMoves = [
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

  const [grid, setGrid] = useState(() => {
    return createEmptyGrid();
  });

  // generation of the cells
  const [running, setRunning] = useState(false);



  //create random pattern
  const randomGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
      );
    }

    setGrid(rows);
  };

  return (
    <div className="App">
      <div className="Grid">
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div className={grid[i][j] ? "CellTurquoise" : "CellWhite"}
              key={`${i}-${j}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][j] = grid[i][j] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
            />
          ))
        )}
      </div>
      {" "}
<div className="Button">
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
        }}
      >
        {running ? "Stop" : "Start"}
      </button>
      <button
        onClick={() => {
          randomGrid();
        }}
      >
        Random
      </button>
      <button
        onClick={() => {
          setGrid(createEmptyGrid());
        }}
      >
        Clear
      </button>
      </div>
    </div>
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
