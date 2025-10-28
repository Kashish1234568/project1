// frontend/src/pages/Customer/OrderStatusTracker.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import io from 'socket.io-client';
import API from '../../api/axios';

const socket = io('http://localhost:5000');

const OrderStatusTracker = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId');
    const tableId = searchParams.get('tableId');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initial order data fetch
    useEffect(() => {
        const fetchInitialOrder = async () => {
            if (!orderId || !tableId) return setLoading(false);
            
            try {
                // Initially, hum order ko history endpoint se fetch kar sakte hain
                const { data } = await API.get(`/orders/me?tableId=${tableId}`); 
                const currentOrder = data.find(o => o._id === orderId);
                setOrder(currentOrder);
            } catch (err) {
                console.error("Failed to fetch order.");
            } finally {
                setLoading(false);
            }
        };
        fetchInitialOrder();
    }, [orderId, tableId]);

    // Socket.io Real-time Setup
    useEffect(() => {
        if (tableId) {
            // Customer is joining the room specific to their table ID
            socket.emit('joinTableOrder', tableId); 

            // Listener for order status changes
            socket.on('orderUpdated', (updatedOrder) => {
                // Ensure the update is for the order currently being tracked
                if (updatedOrder._id === orderId) {
                    setOrder(updatedOrder);
                }
            });
        }

        return () => {
            socket.off('orderUpdated');
        };
    }, [tableId, orderId]);

    if (!orderId || !tableId) return <h2>Invalid Order Tracking Link.</h2>;
    if (loading) return <h2>Tracking your order...</h2>;
    if (!order) return <h2>Order Not Found.</h2>;

    // Status display logic
    const statusColor = { placed: 'red', preparing: 'orange', ready: 'green', served: 'blue' }[order.status] || 'gray';

    return (
        <div style={{ padding: '30px', maxWidth: '600px', margin: '50px auto', border: '1px solid #ddd' }}>
            <h2>Order Status Tracker</h2>
            <p>Order ID: <strong>{order._id}</strong></p>
            <p>Table: <strong>{order.tableNumber}</strong></p>
            <h3>Current Status: <span style={{ color: statusColor }}>{order.status.toUpperCase()}</span></h3>
            
            {/* Simple Progress Bar (You can make it better with CSS) */}
            <div style={{ height: '20px', backgroundColor: '#f0f0f0', borderRadius: '5px', overflow: 'hidden' }}>
                <div 
                    style={{ 
                        width: order.status === 'placed' ? '25%' : order.status === 'preparing' ? '50%' : order.status === 'ready' ? '75%' : '100%', 
                        height: '100%', 
                        backgroundColor: statusColor, 
                        transition: 'width 0.5s' 
                    }}
                />
            </div>

            <h4 style={{ marginTop: '20px' }}>Items Ordered:</h4>
            <ul>
                {order.items.map((item, index) => (
                    <li key={index}>{item.quantity}x {item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default OrderStatusTracker;