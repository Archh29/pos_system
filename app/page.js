'use client';

import { useState, useEffect } from 'react';
import InputForm from '../components/Inputform';
import ExpenseTable from '../components/ExpenseTable';
import BudgetForm from '../components/BudgetForm';
import ChartModal from '../components/ChartModal';

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);

  useEffect(() => {
    fetchExpenses();
    fetchBudget();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost/hello/get_expenses.php');
      const data = await response.json();
      if (Array.isArray(data)) {
        setExpenses(data.map(expense => ({
          ...expense,
          amount: Number(expense.amount) || 0 // Ensure amount is a number
        })));
      } else {
        console.error('Invalid data format for expenses:', data);
        setExpenses([]);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchBudget = async () => {
    try {
      const response = await fetch('http://localhost/hello/get_budget.php');
      const data = await response.json();
      setBudget(Number(data.amount) || 0); // Ensure budget is a number
    } catch (error) {
      console.error('Error fetching budget:', error);
      setBudget(0);
    }
  };

  const addExpense = async (expense) => {
    const totalExpenses = Number(expenses.reduce((acc, exp) => acc + exp.amount, 0));
    const newTotalExpenses = totalExpenses + Number(expense.amount);

    if (newTotalExpenses > budget) {
      alert('Adding this expense would exceed your budget!');
      return;
    }

    try {
      const response = await fetch('http://localhost/hello/add_expense.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      const result = await response.json();
      if (result.success) {
        fetchExpenses();
      } else {
        console.error('Failed to add expense:', result.error);
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const updateBudget = async (newBudget) => {
    const budgetValue = Number(newBudget);
    try {
      const response = await fetch('http://localhost/hello/update_budget.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ budget: budgetValue }),
      });
      const result = await response.json();
      if (result.success) {
        setBudget(budgetValue);
      } else {
        console.error('Failed to update budget:', result.error);
      }
    } catch (error) {
      console.error('Error updating budget:', error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const response = await fetch('http://localhost/hello/delete_expense.php', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (result.success) {
        fetchExpenses();
      } else {
        console.error('Failed to delete expense:', result.error);
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const totalExpenses = Number(expenses.reduce((acc, expense) => acc + expense.amount, 0));
  const remainingAmount = Math.max(budget - totalExpenses, 0); // Prevent negative remaining amount

  useEffect(() => {
    if (remainingAmount < 0) {
      alert('You have overspent your budget!');
    }
  }, [remainingAmount]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
        <BudgetForm budget={budget} handleBudgetChange={updateBudget} />
        <p className="mt-4 text-lg">Total Expenses: ${totalExpenses.toFixed(2)}</p>
        <p className="text-lg">Remaining Amount: ${remainingAmount.toFixed(2)}</p>
        <InputForm addExpense={addExpense} />
        <ExpenseTable expenses={expenses} deleteExpense={deleteExpense} />
        <button 
          onClick={() => setIsChartModalOpen(true)} 
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Show Chart
        </button>
      </div>
      <ChartModal
        isOpen={isChartModalOpen}
        onRequestClose={() => setIsChartModalOpen(false)}
        expenses={expenses}
      />
    </div>
  );
}
