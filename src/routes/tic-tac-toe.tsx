import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/tic-tac-toe')({
  component: RouteComponent,
});

type Token = 'X' | 'O' | '' | null;

function RouteComponent() {
  const [grid, setGrid] = useState<Token[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<'X' | 'O' | 'Tie' | 'None'>('None');

  useEffect(() => {
    const winner = checkWinner();
    if (winner !== 'None') {
      setWinner(winner);
    }
  }, [grid]);

  function checkWinner(): 'X' | 'O' | 'Tie' | 'None' {
    for (let i = 0; i < 3; i++) {
      // Check rows
      const row = grid[i];
      if (row[0] && row[0] === row[1] && row[1] === row[2]) {
        return row[0];
      }

      // Check columns
      const col = grid.map((row) => row[i]);
      if (col[0] && col[0] === col[1] && col[1] === col[2]) {
        return col[0];
      }

      // Check diagonals
      const diag1 = [grid[0][0], grid[1][1], grid[2][2]];
      const diag2 = [grid[0][2], grid[1][1], grid[2][0]];
      if (diag1[0] && diag1[0] === diag1[1] && diag1[1] === diag1[2]) {
        return diag1[0];
      }
      if (diag2[0] && diag2[0] === diag2[1] && diag2[1] === diag2[2]) {
        return diag2[0];
      }
    }

    const isTie = grid.every((row) => row.every((cell) => cell));
    if (isTie) {
      return 'Tie';
    }

    return 'None';
  }

  function resetGame() {
    setGrid([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setCurrentPlayer('X');
    setWinner('None');
  }

  function handleCellClick(rowIndex: number, colIndex: number) {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid.map((row) => [...row])];
      newGrid[rowIndex][colIndex] = currentPlayer;
      return newGrid;
    });
    setCurrentPlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      {winner !== 'None' && (
        <div className="text-xl font-bold flex flex-col items-center gap-4">
          {winner === 'Tie' ? "It's a Tie!" : `${winner} Wins!`}
          <button onClick={resetGame} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Play Again
          </button>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4 bg-gray-600 p-4 rounded-lg shadow-lg">
        {grid.map((row, rowIndex) => (
          <div className="flex flex-col gap-4 text-black">
            {row.map((cell, colIndex) => (
              <button
                onClick={() => handleCellClick(rowIndex, colIndex)}
                disabled={!!cell || winner !== 'None'}
                className="bg-white size-24 text-center flex items-center justify-center text-5xl font-bold"
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
