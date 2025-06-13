import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/whack-a-mole')({
  component: RouteComponent,
});

const MOLE_INTERVAL = 1000; // Time in milliseconds for mole to appear/disappear
const MOLE_DURATION = 700; // Time in milliseconds for mole to stay visible
const GRID_SIZE = 5; // Size of the grid

function RouteComponent() {
  const [holes, setHoles] = useState<boolean[][]>(
    new Array(GRID_SIZE).fill(null).map(() => new Array(GRID_SIZE).fill(false))
  );
  const [score, setScore] = useState<number>(0);

  function toggleMole(rowIndex: number, colIndex: number, value: boolean) {
    setHoles((prevHoles) => {
      const newHoles = [...prevHoles.map((row) => [...row])];
      newHoles[rowIndex][colIndex] = value;
      return newHoles;
    });
  }

  function handleCellClick(rowIndex: number, colIndex: number) {
    if (holes[rowIndex][colIndex]) {
      setScore(score + 1);
      toggleMole(rowIndex, colIndex, false);
    }
  }

  useEffect(() => {
    setInterval(() => {
      const randomRowIndex = Math.floor(Math.random() * holes.length);
      const randomColIndex = Math.floor(Math.random() * holes[randomRowIndex].length);
      toggleMole(randomRowIndex, randomColIndex, true);
      setTimeout(() => {
        toggleMole(randomRowIndex, randomColIndex, false);
      }, MOLE_DURATION);
    }, MOLE_INTERVAL);
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">🐭 Whack a Mole</h1>
      <div className="text-xl mb-4">Score: {score}</div>
      <div className="flex gap-4">
        {holes.map((row, rowIndex) => (
          <div className="flex flex-col gap-4 text-white" key={rowIndex}>
            {row.map((col, colIndex) => (
              <button
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className="size-24 border border-gray-200 items-center justify-center flex rounded-sm text-4xl"
                key={colIndex}
              >
                {col ? '🐭' : ''}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
