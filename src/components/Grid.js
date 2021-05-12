import React, {useState} from "react";


function Grid () {
  
//default rows and coloumns for our grid
const numRows = 10;
const numCols = 10;

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

  return (
<div className="Grid">
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div className={grid[i][j] ? "CellTurquoise" : "CellWhite"}
              key={`${i}-${j}`}
              onClick={()=>{createEmptyGrid()}}
            />
          ))
        )}
      </div>
  )
}



  export default Grid;