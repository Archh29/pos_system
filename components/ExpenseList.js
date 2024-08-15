export default function ExpenseList({ expenses }) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id} className="py-2 flex justify-between">
            <span>{expense.description}</span>
            <span>${expense.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
