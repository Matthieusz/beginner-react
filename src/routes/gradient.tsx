import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/gradient')({
  component: RouteComponent,
});

function RouteComponent() {
  const [fromColor, setFromColor] = useState('#ff0000');
  const [toColor, setToColor] = useState('#0000ff');
  const [direction, setDirection] = useState('to right');

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="font-bold text-2xl">Gradient Generator</h1>
      <div className="flex gap-4 border border-gray-300 rounded-md p-4 h-96 w-2/5">
        <form className="flex flex-col bg-gray-800 p-6 rounded-md space-y-2">
          <label htmlFor="from">From hex</label>
          <input
            name="from"
            type="color"
            value={fromColor}
            onChange={(e) => setFromColor(e.target.value)}
            className="text-black bg-gray-300"
          />
          <label htmlFor="to">To hex</label>
          <input
            name="to"
            type="color"
            value={toColor}
            onChange={(e) => setToColor(e.target.value)}
            className="text-black bg-gray-300"
          />
          <label htmlFor="direction">Direction</label>
          <select
            name="direction"
            id="direction"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="p-2"
          >
            <option value="to right">Right</option>
            <option value="to left">Left</option>
            <option value="to bottom">Bottom</option>
            <option value="to top">Top</option>
          </select>
        </form>
        <div
          className="bg-green-400 flex-grow rounded-md"
          style={{
            background: `linear-gradient(${direction}, ${fromColor}, ${toColor})`,
          }}
        ></div>
      </div>
    </div>
  );
}
