import type { Category, CategoryConfig } from '../types';

export const CATEGORIES: CategoryConfig[] = [
  {
    name: 'Food',
    icon: '🍔',
    color: '#10b981', // green
  },
  {
    name: 'Transport',
    icon: '🚗',
    color: '#3b82f6', // blue
  },
  {
    name: 'Shopping',
    icon: '🛍️',
    color: '#ec4899', // pink
  },
  {
    name: 'Bills',
    icon: '💡',
    color: '#f59e0b', // orange
  },
  {
    name: 'Entertainment',
    icon: '🎬',
    color: '#8b5cf6', // purple
  },
  {
    name: 'Healthcare',
    icon: '🏥',
    color: '#ef4444', // red
  },
  {
    name: 'Other',
    icon: '📦',
    color: '#6b7280', // gray
  },
];

// Helper function to get category info by name
export function getCategoryConfig(categoryName: Category): CategoryConfig {
  return (
    CATEGORIES.find((cat) => cat.name === categoryName) ||
    CATEGORIES[CATEGORIES.length - 1]
  );
}
