import { useState } from 'react';

export default function BudgetForm({ budget, handleBudgetChange }) {
  const [inputBudget, setInputBudget] = useState(budget);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleBudgetChange(parseFloat(inputBudget));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Budget</label>
      <input
        type="number"
        value={inputBudget}
        onChange={(e) => setInputBudget(e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="mt-2 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Set Budget
      </button>
    </form>
  );
}
