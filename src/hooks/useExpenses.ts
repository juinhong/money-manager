import { useState, useEffect } from 'react';
import type { Expense } from '../types';
import {
  db,
  addExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
} from '../db/database';

export function useExpense() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  // Load expenses when component mounts
  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    setLoading(true);
    const allExpenses = await getAllExpenses();
    setExpenses(allExpenses);
    setLoading(false);
  }

  async function add(expense: Omit<Expense, 'id' | 'createdAt'>) {
    const id = await addExpense(expense);
    await loadExpenses(); // Refresh the list
    return id;
  }

  async function update(id: string, updates: Partial<Expense>) {
    await updateExpense(id, updates);
    await loadExpenses(); // Refresh the list
  }

  async function remove(id: string) {
    await deleteExpense(id);
    await loadExpenses(); // Refresh the list
  }

  return {
    expenses,
    loading,
    add,
    update,
    remove,
    refresh: loadExpenses,
  };
}
