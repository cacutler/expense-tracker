'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import components to prevent SSR hydration issues
const ExpenseForm = dynamic(() => import('@/components/ExpenseForm'), {
  ssr: false,
  loading: () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading form...</span>
      </div>
    </div>
  ),
});

const ExpenseList = dynamic(() => import('@/components/ExpenseList'), {
  ssr: false,
  loading: () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading expenses...</span>
      </div>
    </div>
  ),
});

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleExpenseAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Expense Tracker
          </h1>
          <p className="text-lg text-gray-600">
            Track your expenses and manage your budget
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          <div className="lg:col-span-1">
            <ExpenseForm onExpenseAdded={handleExpenseAdded} />
          </div>

          <div className="lg:col-span-1">
            <ExpenseList refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
    </div>
  );
}
