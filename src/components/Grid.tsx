"use client";
import { updateGrid } from "@/logic/cgol";
import { useRef, useState } from "react";

interface Props {
  initialGrid: Array<boolean[]>;
}

export const Grid = ({ initialGrid }: Props) => {
  const [grid, setGrid] = useState(initialGrid);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleStart = () => {
    intervalRef.current = setInterval(() => {
      setGrid(updateGrid);
    }, 100);
  };

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // 40x40 grid of True/False

  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={handleStart}>Start Simulation</button>
      <button onClick={handleStop}>Stop Simulation</button>

      {grid.map((row, y) => {
        return (
          <div key={y} className="flex">
            {row.map((cell, x) => {
              if (cell) {
                return <div key={x} className="size-4 bg-slate-900"></div>;
              }

              return <div key={x} className="size-4 bg-slate-100 border"></div>;
            })}
          </div>
        );
      })}
    </div>
  );
};
