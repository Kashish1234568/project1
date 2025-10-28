// frontend/src/pages/Staff/StaffDashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import API from '../../api/axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Backend URL

const StaffDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [currentFilter, setCurrentFilter] = useState('placed');
    const [loading, setLoading] = useState(true);

    // ✅ Headers me token add function
    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
    };

    // ✅ Orders fetch fix
    const fetchOrders = useCallback(async () => {
        try {
            const { data } = await API.get(`/orders?status=${currentFilter}`, getAuthHeaders());
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    }, [currentFilter]);

    useEffect(() => {
        fetchOrders();

        socket.emit('joinStaffDashboard');

        socket.on('newOrder', (newOrder) => {
            if (newOrder.status === currentFilter) {
                setOrders(prevOrders => [newOrder, ...prevOrders]);
            }
            new Audio('/audio/new-order-alert.mp3').play();
        });

        socket.on('statusChange', (updatedOrder) => {
            setOrders(prevOrders => {
                if (updatedOrder.status === currentFilter) {
                    const index = prevOrders.findIndex(o => o._id === updatedOrder._id);
                    if (index !== -1) {
                        return prevOrders.map(o => o._id === updatedOrder._id ? updatedOrder : o);
                    } else {
                        return [updatedOrder, ...prevOrders];
                    }
                } else {
                    return prevOrders.filter(o => o._id !== updatedOrder._id);
                }
            });
        });

        return () => {
            socket.off('newOrder');
            socket.off('statusChange');
        };
    }, [fetchOrders, currentFilter]);

    // ✅ Status update fix
    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await API.patch(`/orders/${orderId}/status`, { newStatus }, getAuthHeaders());
            console.log(`Status of ${orderId} updated to ${newStatus}`);
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading Dashboard...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Staff Order Dashboard</h2>
            <div style={{ marginBottom: '20px' }}>
                {['placed', 'preparing', 'ready'].map(status => (
                    <button
                        key={status}
                        onClick={() => setCurrentFilter(status)}
                        style={{ margin: '5px', padding: '10px', fontWeight: currentFilter === status ? 'bold' : 'normal' }}
                    >
                        {status.toUpperCase()} ({orders.filter(o => o.status === status).length})
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                {orders.length === 0 ? (
                    <p>No {currentFilter} orders right now!</p>
                ) : (
                    orders.filter(o => o.status === currentFilter).map(order => (
                        <OrderCard key={order._id} order={order} onStatusUpdate={handleStatusUpdate} />
                    ))
                )}
            </div>
        </div>
    );
};

const OrderCard = ({ order, onStatusUpdate }) => (
    <div style={{ border: '2px solid #C8102E', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h3>Table: {order.tableNumber}</h3>
        <p>Status: <strong style={{ color: order.status === 'placed' ? 'red' : order.status === 'ready' ? 'green' : 'orange' }}>{order.status.toUpperCase()}</strong></p>
        <p>Total: ₹{order.totalPrice.toFixed(2)}</p>
        <ul>
            {order.items.map((item, index) => (
                <li key={index}>{item.quantity}x {item.name} ({item.notes})</li>
            ))}
        </ul>
        <div style={{ marginTop: '10px' }}>
            {order.status === 'placed' && (
                <button onClick={() => onStatusUpdate(order._id, 'preparing')}>Start Preparing</button>
            )}
            {order.status === 'preparing' && (
                <button onClick={() => onStatusUpdate(order._id, 'ready')} style={{ backgroundColor: 'green', color: 'white' }}>Mark Ready</button>
            )}
            {order.status === 'ready' && (
                <button onClick={() => onStatusUpdate(order._id, 'served')} style={{ backgroundColor: 'blue', color: 'white' }}>Mark Served</button>
            )}
        </div>
    </div>
);

export default StaffDashboard;
