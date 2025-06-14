import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/quiz')({
  component: RouteComponent,
});

type Answer = {
  answer: string;
  isCorrect: boolean;
};

type Question = {
  question: string;
  answers: Answer[];
};

const questions: Question[] = [
  {
    question: 'What is the capital of France?',
    answers: [
      { answer: 'Berlin', isCorrect: false },
      { answer: 'Madrid', isCorrect: false },
      { answer: 'Paris', isCorrect: true },
      { answer: 'Rome', isCorrect: false },
    ],
  },
  {
    question: 'What is 2 + 2?',
    answers: [
      { answer: '3', isCorrect: false },
      { answer: '4', isCorrect: true },
      { answer: '5', isCorrect: false },
      { answer: '6', isCorrect: false },
    ],
  },
  {
    question: 'What is the largest planet in our solar system?',
    answers: [
      { answer: 'Earth', isCorrect: false },
      { answer: 'Mars', isCorrect: false },
      { answer: 'Jupiter', isCorrect: true },
      { answer: 'Saturn', isCorrect: false },
    ],
  },
  {
    question: 'What is the smallest planet in our solar system?',
    answers: [
      { answer: 'Mercury', isCorrect: true },
      { answer: 'Mars', isCorrect: false },
      { answer: 'Earth', isCorrect: false },
      { answer: 'Venus', isCorrect: false },
    ],
  },
];

function RouteComponent() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const currentQuestion = questions[currentQuestionIndex];
  const [score, setScore] = useState(0);
  const isQuizFinished = currentQuestionIndex >= questions.length;

  function handleAnswerClick(answerIndex: number) {
    setSelectedAnswerIndex(answerIndex);
  }

  function handleSubmit() {
    const answer = currentQuestion.answers[selectedAnswerIndex!];
    if (answer.isCorrect) {
      setScore(score + 1);
    }

    setSelectedAnswerIndex(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function Quiz() {
    return (
      <>
        <div className="flex flex-col gap-4">
          <p className="text-center">
            Question: {currentQuestionIndex + 1} / {questions.length}
          </p>
          <h1 className="text-2xl font-bold">{currentQuestion.question}</h1>
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.answers.map((answer, answerIndex) => (
              <button
                onClick={() => handleAnswerClick(answerIndex)}
                className={`bg-blue-500 text-white p-2 rounded ${
                  selectedAnswerIndex === answerIndex ? 'opacity-40' : ''
                }`}
                key={answer.answer}
              >
                {answer.answer}
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            disabled={selectedAnswerIndex === null}
            className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </>
    );
  }

  function QuizFinished() {
    return (
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Quiz Finished!</h1>
        <p className="text-lg">
          Your score: {score} / {questions.length}
        </p>
        <button
          onClick={() => window.location.reload()} //should maybe reset state instead
          className="bg-blue-500 text-white p-2 rounded"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      {isQuizFinished ? <QuizFinished /> : <Quiz />}
    </div>
  );
}
