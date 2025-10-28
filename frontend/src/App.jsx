// frontend/src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// ✅ Navbar
import Navbar from "./components/Navbar/Navbar";

// ✅ Pages
import LoginPage from './pages/Auth/LoginPage'; 
import CustomerMenu from './pages/Customer/CustomerMenu';
import StaffDashboard from './pages/Staff/StaffDashboard';
import AdminMenuManager from './pages/Admin/AdminMenuManager';
import AdminTableManager from './pages/Admin/AdminTableManager';
import OrderStatusTracker from './pages/Customer/OrderStatusTracker';
import NotFound from './pages/NotFound';

// ✅ New Pages
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";


// --- Protected Routes ---
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { user } = useAuth();

  return (
    <>
      {/* ✅ Navbar always visible */}
      <Navbar />

      {/* ✅ All Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
<Route path="/menu" element={<Menu />} />
<Route path="/m/menu" element={<Menu />} />
        <Route path="/about" element={<About />} /> {/* ✅ About page */}
        <Route path="/contact" element={<Contact />} /> {/* ✅ Contact page */}

        {/* Customer Routes */}
        <Route path="/m/:qrSlug" element={<CustomerMenu />} />
        <Route path="/order-status" element={<OrderStatusTracker />} />

        {/* Staff Routes */}
        <Route 
          path="/staff/orders" 
          element={
            <ProtectedRoute allowedRoles={['staff', 'admin']}>
              <StaffDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
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

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
