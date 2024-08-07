'use client';
import React from 'react';
import { useRouter } from 'next/router'; // Correct import for useRouter

const AdminDashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear any stored authentication information if necessary
    router.push('/login'); // Redirect to login page
  };

  const transactions = [
    { customer: 'Customer 1', status: 'Completed', amount: '₱ 980' },
    { customer: 'Customer 2', status: 'Declined', amount: '₱ 51' },
    { customer: 'Customer 3', status: 'Completed', amount: '₱ 516' },
    { customer: 'Customer 4', status: 'Completed', amount: '₱ 516' },
    { customer: 'Customer 5', status: 'Completed', amount: '₱ 516' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-8 gap-5">
      <header className="flex justify-between items-center bg-blue-600 p-4 rounded">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </header>

      <main className="flex flex-col gap-5 mt-6">
        <section className="flex gap-5">
          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg text-left text-xl font-bold">
            <div>This Day</div>
            <div>₱ 0.00</div>
            <div>+0% From this week</div>
          </div>
          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg text-left text-xl font-bold">
            <div>This Week</div>
            <div>₱ 0.00</div>
            <div>+0% From this day</div>
          </div>
          <div className="flex-2 bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <div className="text-xl font-bold">Today</div>
            <div className="flex items-end gap-3 h-40">
              <div className="bg-green-500 h-20 w-10 rounded-lg shadow-lg transform transition-transform hover:scale-110"></div>
              <div className="bg-green-500 h-24 w-10 rounded-lg shadow-lg transform transition-transform hover:scale-110"></div>
              <div className="bg-green-500 h-16 w-10 rounded-lg shadow-lg transform transition-transform hover:scale-110"></div>
              <div className="bg-green-500 h-18 w-10 rounded-lg shadow-lg transform transition-transform hover:scale-110"></div>
              <div className="bg-green-500 h-12 w-10 rounded-lg shadow-lg transform transition-transform hover:scale-110"></div>
              <div className="bg-green-500 h-10 w-10 rounded-lg shadow-lg transform transition-transform hover:scale-110"></div>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Sales Report</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 bg-gray-700 border-b">Customer</th>
                <th className="p-3 bg-gray-700 border-b">Status</th>
                <th className="p-3 bg-gray-700 border-b">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}`}>
                  <td className="p-3 border-b">{transaction.customer}</td>
                  <td className="p-3 border-b">{transaction.status}</td>
                  <td className="p-3 border-b">{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
