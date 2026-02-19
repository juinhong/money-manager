import { useExpense } from '../hooks/useExpenses';

export function HomePage() {
  const { expenses, loading } = useExpense();

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Expenses</h2>

      {expenses.length === 0 ? (
        <p className="text-gray-500">
          No expenses yet. Click "Add" to create one!
        </p>
      ) : (
        <div className="space-y-2">
          {expenses.map((expense) => (
            <div key={expense.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-lg">${expense.amount}</p>
                  <p className="text-sm text-gray-600">{expense.category}</p>
                  {expense.description && (
                    <p className="text-sm text-gray-500">
                      {expense.description}
                    </p>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
