import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/traffic-light')({
  component: RouteComponent,
});

type TrafficLightColor = 'RED' | 'YELLOW' | 'GREEN';

const RED_DELAY = 5000;
const YELLOW_DELAY = 1000;
const GREEN_DELAY = 5000;

function RouteComponent() {
  return (
    <div className="flex flex-col items-center h-screen gap-8 justify-center">
      <h1 className="text-2xl font-bold">Traffic Lights</h1>
      <div className="flex gap-8">
        <TrafficLight initialColor="RED" />
        <TrafficLight initialColor="YELLOW" />
        <TrafficLight initialColor="GREEN" />
      </div>
    </div>
  );
}

function TrafficLight({ initialColor }: { initialColor: TrafficLightColor }) {
  const [enabled, setEnabled] = useState<TrafficLightColor>(initialColor);

  useEffect(() => {
    if (enabled === 'RED') {
      setTimeout(() => setEnabled('GREEN'), RED_DELAY);
    } else if (enabled === 'GREEN') {
      setTimeout(() => setEnabled('YELLOW'), GREEN_DELAY);
    } else if (enabled === 'YELLOW') {
      setTimeout(() => setEnabled('RED'), YELLOW_DELAY);
    }
  }, [enabled]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-4">
        <div
          className={`bg-red-500 rounded-full size-16 ${
            enabled === 'RED' ? 'opacity-100' : 'opacity-50'
          }`}
        ></div>
        <div
          className={`bg-yellow-500 rounded-full size-16 ${
            enabled === 'YELLOW' ? 'opacity-100' : 'opacity-50'
          }`}
        ></div>
        <div
          className={`bg-green-500 rounded-full size-16 ${
            enabled === 'GREEN' ? 'opacity-100' : 'opacity-50'
          }`}
        ></div>
      </div>
    </div>
  );
}
