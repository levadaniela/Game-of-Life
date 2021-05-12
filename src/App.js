import React, { useCallback, useState, useRef } from "react";
import styled from "styled-components";
import "./App.css"
import produce from "immer";

import { CreateEmptyGrid, RandomPattern, Simulation } from "./components/LogicofGame"
import Button from "./components/Button";
import Wrapper from "./elements/Wrapper";
// import Grid from "./elements/Grid";

// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(10, 20px);
// `;

// const Cells = styled.div`
//  width: 20px;
//   height: 20px;
//   border: solid 1px black;
//   background-color: ${(props) => (props.true ? "turquoise" : "white")}; 
// `;




function App() {
  const [grid, setGrid] = useState(CreateEmptyGrid());

  const [running, setRunning] = useState(false);

  //generation of the cell
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => Simulation(g));
    setTimeout(runSimulation, 100);
  }, []);

  const stopStartFn = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  }
  return (

    <Wrapper>
        <h1> Welcome to Hajoo&Dana's version of GameOfLife</h1>
      <div className="Grid">
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div 
              className={grid[i][j] ? "CellTurquoise" : "CellWhite"}
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
      </div>
      <Button
        onClickFn={() => {
          stopStartFn()
        }}
        name={running ? "Stop" : "Start"}
      />
      <Button
        onClickFn={() => {
          setGrid(RandomPattern());
        }}
        name={"Randomise"}
      />
      <Button
        onClickFn={() => {
          setGrid(CreateEmptyGrid());
        }}
        name={"Clear"}
      />
    </Wrapper>

  );
}

export default App;
