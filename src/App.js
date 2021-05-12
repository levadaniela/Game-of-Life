import React, { useCallback, useState, useRef } from "react";
import "./App.css";
import produce from "immer";
import Button from "./components/Button";


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
    <div className="App">
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
        className="Button"
        onClickFn={
          stopStartFn
        }
        name={running ? "Stop" : "Start"}
      />
      <Button
        className="Button"
        onClickFn={() => {
          setGrid(RandomPattern);
        }}
        name={"Randomise"}
      />
      <Button
        className="Button"
        onClickFn={() => {
          setGrid(CreateEmptyGrid());
        }}
        name={"Clear"}
      />
    </div>
  );
}

export default App;
