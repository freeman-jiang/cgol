export const createGrid = () => {
  return Array(40)
    .fill(null)
    .map(() => Array(40).fill(false));
};

export const randomizeGrid = () => {
  return Array(40)
    .fill(null)
    .map(() =>
      Array(40)
        .fill(null)
        .map(() => Math.random() > 0.5)
    );
};

export const updateGrid = (grid: Array<boolean[]>) => {
  return grid.map((row, y) => {
    return row.map((_, x) => {
      return updateCellState(grid, x, y);
    });
  });
};

export const updateCellState = (
  grid: Array<boolean[]>,
  x: number,
  y: number
) => {
  const neighborsAlive = getNeighborsAlive(grid, x, y);
  const selfAlive = grid[y][x];

  if (selfAlive) {
    // 1) Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    if (neighborsAlive < 2) {
      return false;
    }

    // 2) Any live cell with two or three live neighbours lives on to the next generation.
    if (neighborsAlive === 2 || neighborsAlive === 3) {
      return true;
    }

    // 3) Any live cell with more than three live neighbours dies, as if by overpopulation.
    if (neighborsAlive > 3) {
      return false;
    }

    // Exhaustive
  }

  // 4) Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  if (neighborsAlive === 3) {
    return true;
  }

  // A dead cell is dead by default
  return false;
};

export const updateCellStateRandom = () => {
  return Math.random() > 0.5;
};

// x,y pairs
const neighborVectors = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
] as const;

// Returns the number of alive neighbors
export const getNeighborsAlive = (
  grid: Array<boolean[]>,
  x: number,
  y: number
) => {
  let alive = 0;

  for (const [vx, vy] of neighborVectors) {
    const [cellX, cellY] = [x + vx, y + vy];
    if (
      cellX < 0 ||
      cellX > grid[0].length - 1 ||
      cellY < 0 ||
      cellY > grid.length - 1
    ) {
      continue;
    }

    if (grid[cellY][cellX]) {
      alive += 1;
    }
  }

  return alive;
};
