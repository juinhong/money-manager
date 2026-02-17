import Dexie, { type Table } from 'dexie';
import type { Expense } from '../types/index';

// Define the database class
export class ExpenseDatabase extends Dexie {
  expenses!: Table<Expense>;

  constructor() {
    super('MoneyManagerDB');

    // Define the schema
    this.version(1).stores({
      expenses: 'id, date, category, amount',
    });
  }
}

// Create a single instance
export const db = new ExpenseDatabase();

// CRUD Operations

// CREATE - Add a new expense
export async function addExpense(expense: Omit<Expense, 'id' | 'createdAt'>) {
  const id = crypto.randomUUID();
  const createdAt = new Date();

  await db.expenses.add({
    ...expense,
    id,
    createdAt,
  });

  return id;
}

// READ - Get all expenses
export async function getAllExpenses(): Promise<Expense[]> {
  return await db.expenses.toArray();
}

// UPDATE - Edit an expense
export async function updateExpense(id: string, updates: Partial<Expense>) {
  await db.expenses.update(id, updates);
}

// DELETE - Remove an expense
export async function deleteExpense(id: string) {
  await db.expenses.delete(id);
}
