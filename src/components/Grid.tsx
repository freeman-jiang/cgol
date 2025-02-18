"use client";
import { Button } from "@/components/ui/button";
import { createGrid, randomizeGrid, updateGrid } from "@/logic/cgol";
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
      intervalRef.current = null;
    }
  };

  const toggleCell = (x: number, y: number) => {
    if (intervalRef.current) return; // Prevent editing while running
    setGrid((grid) => {
      const newGrid = grid.map((row) => [...row]);
      newGrid[y][x] = !newGrid[y][x];
      return newGrid;
    });
  };

  const handleRandomize = () => {
    if (intervalRef.current) return;
    setGrid(randomizeGrid());
  };

  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setGrid(createGrid());
  };

  return (
    <div className="flex flex-col items-center gap-4 p-2 sm:p-4 max-w-full overflow-x-hidden">
      <h1 className="text-xl sm:text-2xl font-bold text-center">
        {"Conway's Game of Life"}
      </h1>

      <div className="flex flex-wrap justify-center gap-2">
        <Button
          onClick={handleStart}
          variant="default"
          disabled={!!intervalRef.current}
          className="text-sm sm:text-base"
        >
          Start
        </Button>
        <Button
          onClick={handleStop}
          variant="outline"
          disabled={!intervalRef.current}
          className="text-sm sm:text-base"
        >
          Stop
        </Button>
        <Button
          onClick={handleRandomize}
          variant="secondary"
          disabled={!!intervalRef.current}
          className="text-sm sm:text-base"
        >
          Random
        </Button>
        <Button
          onClick={handleReset}
          variant="secondary"
          className="text-sm sm:text-base"
        >
          Reset
        </Button>
      </div>

      <div className="border rounded-lg p-1 bg-slate-50 max-w-full overflow-auto">
        {grid.map((row, y) => {
          return (
            <div key={y} className="flex">
              {row.map((cell, x) => {
                if (cell) {
                  return (
                    <div
                      key={x}
                      onClick={() => toggleCell(x, y)}
                      className="size-3 sm:size-4 bg-slate-900 rounded-lg transition-colors cursor-pointer hover:bg-slate-700"
                    />
                  );
                }
                return (
                  <div
                    key={x}
                    onClick={() => toggleCell(x, y)}
                    className="size-3 sm:size-4 bg-slate-100 border-[0.5px] border-slate-200 rounded-lg transition-colors cursor-pointer hover:bg-slate-200"
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
