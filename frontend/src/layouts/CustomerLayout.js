import React from 'react';
import { IoRestaurantOutline } from 'react-icons/io5';

const CustomerLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col items-center">
      {/* Header - Simple and Clean for Customer View */}
      <header className="w-full bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="max-w-xl mx-auto flex items-center justify-center space-x-2">
          <IoRestaurantOutline className="w-6 h-6 text-indigo-600" />
          <h1 className="text-xl font-bold text-gray-800">Scan & Dine Lite</h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-xl flex-1">
        {/* Children will be OrderStatusTracker or other Customer pages */}
        {children}
      </main>
      
      {/* Footer */}
      <footer className="w-full max-w-xl text-center p-3 text-xs text-gray-500 border-t mt-4">
        Thank you for dining with us!
      </footer>
    </div>
  );
};

export default CustomerLayout;
