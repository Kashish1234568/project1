// frontend/src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// ✅ Navbar import
import Navbar from "./components/Navbar/Navbar";

// Pages
import LoginPage from './pages/Auth/LoginPage'; 
import CustomerMenu from './pages/Customer/CustomerMenu';
import StaffDashboard from './pages/Staff/StaffDashboard';
import AdminMenuManager from './pages/Admin/AdminMenuManager';
import AdminTableManager from './pages/Admin/AdminTableManager';
import OrderStatusTracker from './pages/Customer/OrderStatusTracker';
import NotFound from './pages/NotFound';

// --- Router Guard/Protected Component ---
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
// ----------------------------------------

function App() {
  const { user } = useAuth();
  console.log(user)

  return (
    <>
      {/* ✅ Navbar sabhi pages par dikhegi */}
      <Navbar />

      {/* ✅ All Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Customer Routes */}
        <Route path="/m/:qrSlug" element={<CustomerMenu />} />
        <Route path="/order-status" element={<OrderStatusTracker />} />

        {/* Staff Protected Routes */}
        <Route 
          path="/staff/orders" 
          element={
            <ProtectedRoute allowedRoles={['staff', 'admin']}>
              <StaffDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected Routes */}
        <Route 
          path="/admin/menu" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminMenuManager />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/tables" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminTableManager />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
