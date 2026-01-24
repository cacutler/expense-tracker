'use client';

import { useState, useEffect } from 'react';
import { Expense } from '@/types/expense';
import { getExpenses } from '@/lib/api';
import ExpenseItem from './ExpenseItem';

interface ExpenseListProps {
  refreshTrigger: number;
  onExpenseEdit: (expense: Expense) => void;
}

export default function ExpenseList({ refreshTrigger, onExpenseEdit }: ExpenseListProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      setError('Failed to load expenses. Please try again.');
      console.error('Failed to fetch expenses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [refreshTrigger]);

  const handleExpenseDeleted = () => {
    fetchExpenses();
  };

  const totalAmount = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading expenses...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchExpenses}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Expenses</h2>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Spent</p>
          <p className="text-2xl font-bold text-green-600">
            ${totalAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {expenses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No expenses yet. Add your first expense above!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onExpenseDeleted={handleExpenseDeleted}
              onExpenseEdit={onExpenseEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}