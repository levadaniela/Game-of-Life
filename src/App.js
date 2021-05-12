import React, { useCallback, useState, useRef } from "react";
import "./App.css";
import produce from "immer";
import Button from "./components/Button";
import Wrapper from "./components/Wrapper";
import Grid from "./components/Grid";


import { CreateEmptyGrid, RandomPattern, Simulation } from "./components/LogicofGame"

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

    <h1> Welcome to Hajoo&Dana's version of GameOfLife</h1>

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
