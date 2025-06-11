import { createFileRoute } from '@tanstack/react-router';
import { BrickWall, Scissors, Scroll } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/rock-paper-scissors')({
  component: RouteComponent,
});

type Weapon = 'rock' | 'paper' | 'scissors';
const weapons = ['rock', 'paper', 'scissors'] as const;

function RouteComponent() {
  const [userChoice, setUserChoice] = useState<Weapon | null>(null);
  const [aiChoice, setAiChoice] = useState<Weapon | null>(null);
  const [gameState, setGameState] = useState<'playing' | 'done'>('playing');

  function handleUserChoice(choice: Weapon) {
    setUserChoice(choice);
    const randomIndex = Math.floor(Math.random() * weapons.length);
    const aiChoice = weapons[randomIndex];
    setAiChoice(aiChoice);
    setGameState('done');
  }

  function getResult() {
    if (userChoice === aiChoice) {
      return "It's a tie!";
    }
    if (
      (userChoice === 'rock' && aiChoice === 'scissors') ||
      (userChoice === 'paper' && aiChoice === 'rock') ||
      (userChoice === 'scissors' && aiChoice === 'paper')
    ) {
      return 'WOU WIN!';
    }
    return 'YOU LOSE!';
  }

  function restartGame() {
    setUserChoice(null);
    setAiChoice(null);
    setGameState('playing');
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      {gameState === 'playing' ? (
        <>
          <h1>Pick your weapon</h1>
          <div className="flex items-center justify-center gap-8">
            <button
              className="p-8 border border-gray-500 rounded bg-gray-800 w-52 h-80 flex flex-col items-center justify-center gap-2"
              onClick={() => handleUserChoice('rock')}
            >
              <BrickWall className="size-12" />
              ROCK
            </button>
            <button
              className="p-8 border border-gray-500 rounded bg-gray-800 w-52 h-80 flex flex-col items-center justify-center gap-2"
              onClick={() => handleUserChoice('paper')}
            >
              <Scroll className="size-12" />
              PAPER
            </button>
            <button
              className="p-8 border border-gray-500 rounded bg-gray-800 w-52 h-80 flex flex-col items-center justify-center gap-2"
              onClick={() => handleUserChoice('scissors')}
            >
              <Scissors className="size-12" />
              SCISSORS
            </button>
          </div>
        </>
      ) : (
        <>
          <h1>GAME OVER</h1>
          <p>
            You chose <span className="font-bold">{userChoice}</span> and the AI chose{' '}
            <span className="font-bold">{aiChoice}</span>.
          </p>
          <p>{getResult()}</p>
          <button className="p-4 rounded bg-blue-500" onClick={restartGame}>
            PLAY AGAIN
          </button>
        </>
      )}
    </div>
  );
}
