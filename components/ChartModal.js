// components/ChartModal.js
'use client';

import { useState } from 'react';
import Modal from 'react-modal';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default function ChartModal({ isOpen, onRequestClose, expenses }) {
  const chartData = {
    labels: expenses.map(expense => expense.description),
    datasets: [
      {
        label: 'Expenses',
        data: expenses.map(expense => expense.amount),
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 205, 86, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 205, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl mx-auto"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
    >
      <div className="relative bg-white p-6 rounded-lg shadow-lg">
        <button
          onClick={onRequestClose}
          className="absolute top-4 right-4 text-red-500 text-2xl font-bold"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Expenses Chart</h2>
        <div className="h-64">
          <Pie data={chartData} />
        </div>
      </div>
    </Modal>
  );
}
