import { createFileRoute } from '@tanstack/react-router';
import { clear } from 'console';
import { useRef, useState } from 'react';

export const Route = createFileRoute('/stopwatch')({
  component: RouteComponent,
});

function RouteComponent() {
  const [elapsed, setElapsed] = useState(0);
  const [state, setState] = useState<'initial' | 'running' | 'paused'>('initial');
  const intervalRef = useRef<NodeJS.Timeout>(null);

  function start() {
    setState('running');
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
  }

  function pause() {
    setState('paused');
    clear();
  }

  function resume() {
    setState('running');
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
  }

  function reset() {
    setState('initial');
    setElapsed(0);
    clear();
  }

  function clear() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-4 border border-gray-50 rounded p-4 text-center w-52">
        <div>{elapsed} seconds elapsed</div>
        {state === 'initial' && (
          <button onClick={start} className="bg-blue-500 text-white rounded px-4 py-2">
            Start
          </button>
        )}
        {state === 'running' && (
          <button onClick={pause} className="bg-yellow-500 text-white rounded px-4 py-2">
            Pause
          </button>
        )}
        {state === 'paused' && (
          <div className="flex gap-2">
            <button onClick={resume} className="bg-green-500 text-white rounded px-4 py-2">
              Resume
            </button>
            <button onClick={reset} className="bg-red-500 text-white rounded px-4 py-2">
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
