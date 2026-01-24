'use client';

import { Expense } from '@/types/expense';
import { deleteExpense } from '@/lib/api';

interface ExpenseItemProps {
  expense: Expense;
  onExpenseDeleted: () => void;
}

export default function ExpenseItem({ expense, onExpenseDeleted }: ExpenseItemProps) {
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this expense?')) return;

    try {
      await deleteExpense(expense.id);
      onExpenseDeleted();
    } catch (error) {
      console.error('Failed to delete expense:', error);
      alert('Failed to delete expense. Please try again.');
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatAmount = (amount: number | string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Number(amount));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{expense.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{expense.category}</p>
          <p className="text-xs text-gray-500 mt-1">{formatDate(expense.date)}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-green-600">
            {formatAmount(expense.amount)}
          </span>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
            title="Delete expense"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}