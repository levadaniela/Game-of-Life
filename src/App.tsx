import React, { useCallback, useState, useRef } from "react";

import "./App.css"
import produce from "immer";

import { CreateEmptyGrid, RandomPattern, Simulation } from "./components/LogicofGame"
import Button from "./components/Button";
import Wrapper from "./elements/Wrapper";
import { Grid, Cells } from "./elements/Grid";



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
  const handleUserInput = (i:number, j:number): void => {
                // user click
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][j] = grid[i][j] ? 0 : 1;
                });
                setGrid(newGrid);
  }
  return (

    <Wrapper>
        <h1> Welcome to Hajoo&Dana's version of GameOfLife</h1>
      <Grid>
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <Cells 
              live = {grid[i][j] === 1}  
              key={`${i}-${j}`}
              onClick={() => {
              handleUserInput(i,j)
              }}
            />
          ))
        )}
      </Grid>
      <div style={{display:"grid", columnGap: "10px", gridTemplateColumns: "repeat (3)"}}>
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
      </div>
    </Wrapper>

  );
}

export default App;

// when no cell - continue to run;
// when we have static pattern it ontinue to run;
//after we press clear same 