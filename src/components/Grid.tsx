"use client";
import { Button } from "@/components/ui/button";
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
    }, 125);
  };

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // 40x40 grid of True/False

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">{"Conway's Game of Life"}</h1>

      <div className="flex gap-2">
        <Button onClick={handleStart} variant="default">
          Start Simulation
        </Button>
        <Button onClick={handleStop} variant="outline">
          Stop Simulation
        </Button>
      </div>

      <div className="border rounded-lg p-1 bg-slate-50">
        {grid.map((row, y) => {
          return (
            <div key={y} className="flex">
              {row.map((cell, x) => {
                if (cell) {
                  return (
                    <div
                      key={x}
                      className="size-4 bg-slate-900 rounded-lg transition-colors"
                    />
                  );
                }
                return (
                  <div
                    key={x}
                    className="size-4 bg-slate-100 border-[0.5px] border-slate-400 rounded-lg transition-colors"
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
