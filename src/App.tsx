import { useEffect } from 'react';
import { useExpense } from './hooks/useExpenses';

function App() {
  const { expenses, loading, add } = useExpense();

  // Test: Add a sample expense when app loads
  useEffect(() => {
    async function testAdd() {
      await add({
        amount: 50,
        category: 'Food',
        description: 'Test lunch',
        date: new Date(),
      });
    }
    testAdd();
  }, []);

  const handleAddTest = async () => {
    await add({
      amount: 50,
      category: 'Food',
      description: 'Test lunch',
      date: new Date(),
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Money Manager - Day 2 Test</h1>

      <button
        onClick={handleAddTest}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        Add Test Expense
      </button>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">
          Expenses in Database ({expenses.length}):
        </h2>
        {expenses.length === 0 ? (
          <p>No expenses yet - click the button!</p>
        ) : (
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id} className="border-b py-2">
                ${expense.amount} - {expense.category} - {expense.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
