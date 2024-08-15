import React from 'react';

export default function ExpenseTable({ expenses, deleteExpense }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Expense List</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Description</th>
            <th className="py-2 px-4 border-b text-left">Amount</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="py-2 px-4 border-b">{expense.description}</td>
              <td className="py-2 px-4 border-b">
                ${parseFloat(expense.amount).toFixed(2)}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
