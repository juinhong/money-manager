import { Outlet, Link, useLocation } from 'react-router-dom';

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">Money Manager</h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around">
          <Link
            to="/"
            className={`flex-1 text-center py-4 ${
              location.pathname === '/' 
                ? 'text-blue-600 font-semibold' 
                : 'text-gray-600'
            }`}
          >
            🏠 Home
          </Link>
          <Link
            to="/add"
            className={`flex-1 text-center py-4 ${
              location.pathname === '/add' 
                ? 'text-blue-600 font-semibold' 
                : 'text-gray-600'
            }`}
          >
            ➕ Add
          </Link>
          <Link
            to="/summary"
            className={`flex-1 text-center py-4 ${
              location.pathname === '/summary' 
                ? 'text-blue-600 font-semibold' 
                : 'text-gray-600'
            }`}
          >
            📊 Summary
          </Link>
        </div>
      </nav>
    </div>
  );
}