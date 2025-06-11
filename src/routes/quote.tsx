import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/quote')({
  component: RouteComponent,
});

type Quote = {
  sentence: string;
  character: {
    name: string;
    slug: string;
    house: {
      name: string;
      slug: string;
    };
  };
};

function fetchQuote() {
  return fetch('https://api.gameofthronesquotes.xyz/v1/random').then(
    (response) => response.json() as Promise<Quote>
  );
}

function RouteComponent() {
  const {
    data: quote,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['quote'],
    queryFn: () => fetchQuote(),
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border border-gray-50 rounded-lg w-96 h-52 flex flex-col justify-between">
        <div className="flex justify-center items-center h-full p-4">
          {isFetching ? <p className="text-gray-500">Loading...</p> : <p>{quote?.sentence}</p>}
        </div>
        <button
          onClick={() => refetch()}
          className="w-full bg-blue-500 text-white py-2 rounded-b-lg hover:bg-blue-600"
        >
          Next Quote
        </button>
      </div>
    </div>
  );
}
