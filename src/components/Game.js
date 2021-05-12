import React, {useState, useRef, useCallback} from "react"



function Game ( { grid, setGrid }){

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

//create random pattern
// const randomGrid = () => {
//     const rows = [];
//     for (let i = 0; i < numRows; i++) {
//       rows.push(
//         Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
//       );
//     }

//     setGrid(rows);
//   };

const randomGrid = () => {
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
        availableMoves.forEach(([x, y]) => {
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


  
  // generation of the cells
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
       < div className="Game">
    <div
    onClick={() => {
      setRunning(false);
      // update ref to prevent race condition?
      // Not needed?
      // runningRef.current = false;
      setGrid(randomGrid());

      setRunning(true);
      // runningRef.current = true;
    }}>
  Restart
  </div>
  <div
          onClick={() => {
            if (running) {
              setRunning(false);
              // runningRef.current = false;
            } else {
              setRunning(true);
              // runningRef.current = true;
            }
          }}
        >
          {/* {running ? stopIcon : playIcon} */}
        </div>
        </div>
   )
}

export default Game;