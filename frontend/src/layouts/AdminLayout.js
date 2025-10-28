import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Menu Manager', path: '/admin/menu' },
    { name: 'Table Manager', path: '/admin/tables' },
    { name: 'User Management', path: '/admin/users' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white shadow-xl flex flex-col p-4">
        <div className="text-2xl font-bold mb-8 border-b border-indigo-700 pb-4">Admin Dashboard</div>
        <nav className="flex-grow space-y-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="w-full text-left p-3 rounded-lg hover:bg-indigo-700 transition duration-150"
            >
              {item.name}
            </button>
          ))}
        </nav>
        <button
          onClick={() => navigate('/login')} // Mock Logout
          className="w-full text-left p-3 rounded-lg bg-red-600 hover:bg-red-700 mt-4 transition duration-150"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <header className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome, Admin!</h1>
        </header>
        {/* Outlet renders the specific Admin pages (Menu, Tables, Users) */}
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminLayout;
