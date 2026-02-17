// Possible expense categories
export type Category =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Bills'
  | 'Entertainment'
  | 'Healthcare'
  | 'Other';

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  description?: string;
  date: Date;
  createdAt: Date;
}
