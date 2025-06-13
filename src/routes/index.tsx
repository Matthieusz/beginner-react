import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Link to="/rock-paper-scissors">Rock Paper Scissors</Link>
      <Link to="/stopwatch">Stopwatch</Link>
      <Link to="/dice">Dice</Link>
      <Link to="/traffic-light">Traffic Light</Link>
      <Link to="/quote">Random Quote Generator</Link>
      <Link to="/gradient">Gradient Generator</Link>
      <Link to="/tic-tac-toe">Tic Tac Toe</Link>
      <Link to="/whack-a-mole">Whack a Mole</Link>
    </div>
  );
}
