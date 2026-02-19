import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useExpense } from '../hooks/useExpenses';
import type { Category } from '../types';
import toast from 'react-hot-toast';

interface ExpenseFormData {
  amount: number;
  category: Category;
  date: string;
  description?: string;
}

export function AddExpensePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormData>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0], // Today's date
    },
  });

  const { add } = useExpense();
  const navigate = useNavigate();

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      await add({
        amount: data.amount,
        category: data.category,
        date: new Date(data.date),
        description: data.description,
      });

      // Show success message
      toast.success('Expense added successfully!');

      // Reset the form to default values
      reset({
        amount: 0,
        category: '' as Category,
        date: new Date().toISOString().split('T')[0],
        description: '',
      });

      // Optional: Navigate to home (or keep them on the form to add more)
      // navigate('/');
    } catch (error) {
      // Show error message if something goes wrong
      toast.error('Failed to add expense. Please try again.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Add New Expense</h2>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          View All →
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Amount Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount *
          </label>
          <input
            type="number"
            step="0.01"
            {...register('amount', {
              required: 'Amount is required',
              min: { value: 0.01, message: 'Amount must be greater than 0' },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>
        {/* Category Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            {...register('category', { required: 'Category is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a category</option>
            <option value="Food">🍔 Food</option>
            <option value="Transport">🚗 Transport</option>
            <option value="Shopping">🛍️ Shopping</option>
            <option value="Bills">💡 Bills</option>
            <option value="Entertainment">🎬 Entertainment</option>
            <option value="Healthcare">🏥 Healthcare</option>
            <option value="Other">📦 Other</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>
        {/* Date Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date *
          </label>
          <input
            type="date"
            {...register('date', { required: 'Date is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        {/* Description Field (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (optional)
          </label>
          <textarea
            {...register('description')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Lunch with friends"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 font-semibold transition-colors"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}
