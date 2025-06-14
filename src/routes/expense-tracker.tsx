import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/expense-tracker')({
  component: RouteComponent,
});

type Expense = {
  description: string;
  amount: number;
  type: 'income' | 'expense';
};

function RouteComponent() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<'income' | 'expense'>('income');
  const total = expenses
    .reduce((total, expense) => {
      return expense.type === 'income' ? total + expense.amount : total - expense.amount;
    }, 0)
    .toFixed(2);

  function handleExpenseSubmit() {
    const newExpense: Expense = {
      description,
      amount,
      type,
    };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    setDescription('');
    setAmount(0);
    setType('income');
  }

  function handleRemoveExpense(index: number) {
    setExpenses((prevExpenses) => prevExpenses.filter((_, i) => i !== index));
  }

  return (
    <div className="h-screen flex justify-center">
      <div className="mt-10">
        <form
          className="bg-white p-6 rounded-lg shadow-md w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleExpenseSubmit();
          }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Transaction</h2>

          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter description"
              />
            </div>

            <div className="flex-1 min-w-32">
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div className="flex-1 min-w-32">
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as 'income' | 'expense')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              Add Transaction
            </button>
          </div>
        </form>
        {expenses.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Transactions:</h2>
            <ul className="rounded-lg shadow-md">
              {expenses.map((expense, index) => (
                <li key={index} className="flex items-center gap-2 mt-2">
                  <div
                    className={`flex justify-between items-center flex-grow p-4 ${
                      expense.type === 'income' ? 'bg-green-300' : 'bg-red-300'
                    } rounded-md `}
                  >
                    <span className="text-gray-800 font-medium">{expense.description}</span>
                    <span
                      className={`text-lg font-bold ${
                        expense.type === 'income' ? 'text-green-700' : 'text-red-700'
                      }`}
                    >
                      {expense.type === 'income' ? '+' : '-'}${expense.amount.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={() => handleRemoveExpense(index)}
                      className="bg-red-500 hover:bg-red-600 text-white font-medium p-4 rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-lg font-bold text-center mt-6">Total Balance: ${total}</div>
      </div>
    </div>
  );
}
