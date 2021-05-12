import React from "react";



const Grid (()=>{
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


})





  export default Grid()