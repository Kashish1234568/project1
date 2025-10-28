// frontend/src/components/Admin/AdminLayout.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminLayout = ({ children, current }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', backgroundColor: '#343a40', color: 'white', padding: '20px' }}>
                <h1 style={{ color: '#C8102E' }}>Admin Panel</h1>
                <nav style={{ marginTop: '30px' }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '10px' }}>
                            <Link to="/admin/menu" style={{ color: current === 'menu' ? '#C8102E' : 'white', textDecoration: 'none', fontWeight: 'bold' }}>🍴 Menu Manager</Link>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <Link to="/admin/tables" style={{ color: current === 'tables' ? '#C8102E' : 'white', textDecoration: 'none', fontWeight: 'bold' }}>🪑 Table Manager</Link>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            {/* Staff Dashboard link bhi Admin ke liye useful hai */}
                            <Link to="/staff/orders" style={{ color: current === 'orders' ? '#C8102E' : 'white', textDecoration: 'none', fontWeight: 'bold' }}>🔔 Live Orders (Staff)</Link>
                        </li>
                    </ul>
                </nav>
                <button onClick={handleLogout} style={{ marginTop: '50px', padding: '10px', backgroundColor: '#C8102E', color: 'white', border: 'none' }}>Logout</button>
            </aside>

            {/* Main Content */}
            <main style={{ flexGrow: 1, padding: '20px', backgroundColor: '#f8f9fa' }}>
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;