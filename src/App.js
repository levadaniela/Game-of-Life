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

  //because running is changing above but in runSImulation we use it only once, we need to create a running ref:

  const runningRef = useRef();
  runningRef.current = running;

  //create simulation, which need to run once, for this will use callback hook
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      // g - current grid; produce creeate a new grid and update the setGrid
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            // computes neighbors
            let neighbors = 0;
            availableMoves.forEach(([x, y]) => {
              const newI = i + x;
              const newK = j + y;
              //check if we go out of borders
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
                console.log(g[newI][newK]);
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              // fewer than 2 and more than 3 dies
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && neighbors === 3) {
              // dead cell with 3 neighbours becomes alive
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });
    // simulate

    setTimeout(runSimulation, 100);
  }, []);

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
