import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const StaffLayout = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header for Staff */}
      <header className="bg-green-600 shadow-lg text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Staff Console</h1>
        <nav className="space-x-4">
          <button
            onClick={() => navigate('/staff/orders')}
            className="p-2 rounded-lg hover:bg-green-700 transition duration-150"
          >
            Order Dashboard
          </button>
          <button
            onClick={() => navigate('/login')} // Mock Logout
            className="p-2 rounded-lg bg-red-500 hover:bg-red-600 transition duration-150"
          >
            Logout
          </button>
        </nav>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6">
        {/* Outlet renders the specific Staff pages (StaffDashboard) */}
        <Outlet /> 
      </main>
    </div>
  );
};

export default StaffLayout;
