import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/dice')({
  component: RouteComponent,
});

function RouteComponent() {
  const [number, setNumber] = useState<number | undefined>();

  const rollDice = () => {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    setNumber(diceRoll);
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <button onClick={rollDice} className="bg-blue-500 text-white rounded px-4 py-2">
        Roll
      </button>
      {number !== undefined && <Dice number={number} />}
    </div>
  );
}

function Dice({ number }: { number: number }) {
  return (
    <div className="flex justify-center items-center bg-gray-50 rounded p-4 size-32 gap-4 text-black">
      {number === 1 && <div className="bg-black rounded-full size-6"></div>}
      {number === 2 && (
        <>
          <div className="bg-black rounded-full size-6"></div>
          <div className="bg-black rounded-full size-6"></div>
        </>
      )}
      {number === 3 && (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex w-full items-start justify-start">
            <div className="bg-black rounded-full size-6"></div>
          </div>
          <div className="flex w-full items-center justify-center">
            <div className="bg-black rounded-full size-6"></div>
          </div>
          <div className="flex w-full items-end justify-end">
            <div className="bg-black rounded-full size-6"></div>
          </div>
        </div>
      )}
      {number === 4 && (
        <div className="flex flex-col gap-12 w-full">
          <div className="flex w-full justify-between gap-4">
            <div className="bg-black rounded-full size-6"></div>
            <div className="bg-black rounded-full size-6"></div>
          </div>
          <div className="flex w-full justify-between gap-4">
            <div className="bg-black rounded-full size-6"></div>
            <div className="bg-black rounded-full size-6"></div>
          </div>
        </div>
      )}
      {number === 5 && (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex w-full justify-between gap-4">
            <div className="bg-black rounded-full size-6"></div>
            <div className="bg-black rounded-full size-6"></div>
          </div>
          <div className="flex w-full justify-center gap-4">
            <div className="bg-black rounded-full size-6"></div>
          </div>
          <div className="flex w-full justify-between gap-4">
            <div className="bg-black rounded-full size-6"></div>
            <div className="bg-black rounded-full size-6"></div>
          </div>
        </div>
      )}
      {number === 6 && (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex w-full justify-between gap-4">
            <div className="bg-black rounded-full size-6"></div>
            <div className="bg-black rounded-full size-6"></div>
          </div>
          <div className="flex w-full justify-between gap-4">
            <div className="bg-black rounded-full size-6"></div>
            <div className="bg-black rounded-full size-6"></div>
          </div>
          <div className="flex w-full justify-between gap-4">
            <div className="bg-black rounded-full size-6"></div>
            <div className="bg-black rounded-full size-6"></div>
          </div>
        </div>
      )}
    </div>
  );
}
