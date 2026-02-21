import { useExpense } from '../hooks/useExpenses';
import { getCategoryConfig } from '../utils/categories';

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
          {expenses.map((expense) => {
            const categoryConfig = getCategoryConfig(expense.category);

            return (
              <div key={expense.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    {/* Category Icon with Color */}
                    <div
                      className="text-2xl w-10 h-10 flex items-center justify-center rounded-full"
                      style={{ backgroundColor: categoryConfig.color + '20' }}
                    >
                      {categoryConfig.icon}
                    </div>

                    <div>
                      <p className="font-semibold text-lg">
                        ${Number(expense.amount).toFixed(2)}
                      </p>
                      <p
                        className="text-sm font-medium"
                        style={{ color: categoryConfig.color }}
                      >
                        {expense.category}
                      </p>
                      {expense.description && (
                        <p className="text-sm text-gray-500">
                          {expense.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">
                    {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
