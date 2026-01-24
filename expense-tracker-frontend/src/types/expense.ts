export interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: Date;
}

export interface CreateExpenseData {
  title: string;
  amount: number;
  category: string;
}