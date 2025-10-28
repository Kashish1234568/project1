// frontend/src/components/Customer/CartSidebar.jsx
import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import API from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {
    const { cart, tableContext, updateItemQuantity, calculateTotals, clearCart } = useCart();
    const [isPlacing, setIsPlacing] = useState(false);
    const [orderError, setOrderError] = useState(null);
    const navigate = useNavigate();

    const totals = calculateTotals();

    const handlePlaceOrder = async () => {
        if (cart.length === 0 || !tableContext) {
            alert("Cart is empty or table context is missing.");
            return;
        }

        setIsPlacing(true);
        setOrderError(null);

        const orderPayload = {
            tableId: tableContext.tableId,
            // Backend ko items sirf zaruri fields ke saath bhejo
            items: cart.map(item => ({ 
                menuItemId: item.menuItemId, 
                quantity: item.quantity, 
                note: item.notes 
            })),
            // userId: // Agar user logged in hai to yahan lagayenge (Optional)
        };

        try {
            const res = await API.post('/orders', orderPayload);
            alert(`Order successfully placed! Order ID: ${res.data._id}`);
            
            // Success hone par cart clear karke status tracker par redirect karo
            clearCart(); 
            // NOTE: Yahan hum customer ko Order Status Tracker page par bhejenge
            navigate(`/order-status?tableId=${tableContext.tableId}&orderId=${res.data._id}`); 

        } catch (err) {
            setOrderError(err.response?.data?.message || 'Failed to place order.');
        } finally {
            setIsPlacing(false);
        }
    };

    if (cart.length === 0) {
        return <div>Your cart is empty. Add some delicious items!</div>;
    }

    return (
        <div>
            <h3>Your Order (Table {tableContext?.tableNumber})</h3>
            <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '15px' }}>
                {cart.map(item => (
                    <div key={item.menuItemId} style={{ borderBottom: '1px dotted #eee', padding: '10px 0' }}>
                        <p style={{ margin: 0 }}>
                            {item.name} (₹{item.price.toFixed(2)})
                            <span style={{ float: 'right' }}>Qty: 
                                <input 
                                    type="number" 
                                    min="0" 
                                    value={item.quantity} 
                                    onChange={(e) => updateItemQuantity(item.menuItemId, parseInt(e.target.value))}
                                    style={{ width: '40px', marginLeft: '5px' }}
                                />
                            </span>
                        </p>
                        {item.notes && <p style={{ fontSize: '0.8em', color: '#888' }}>Note: {item.notes}</p>}
                    </div>
                ))}
            </div>
            
            <div style={{ borderTop: '2px solid #333', paddingTop: '10px' }}>
                <p>Subtotal: <strong>₹{totals.subtotal.toFixed(2)}</strong></p>
                <p>Tax (5%): <strong>₹{totals.tax.toFixed(2)}</strong></p>
                <h4>Total: <strong style={{ color: '#C8102E' }}>₹{totals.totalPrice.toFixed(2)}</strong></h4>
            </div>

            {orderError && <p style={{ color: 'red', fontSize: '0.9em' }}>{orderError}</p>}

            <button 
                onClick={handlePlaceOrder} 
                disabled={isPlacing || cart.length === 0}
                style={{ width: '100%', padding: '12px', backgroundColor: '#C8102E', color: 'white', border: 'none', marginTop: '10px' }}
            >
                {isPlacing ? 'Placing...' : 'Place Order'}
            </button>
            <button onClick={clearCart} style={{ width: '100%', padding: '8px', backgroundColor: '#ddd', border: 'none', marginTop: '5px' }}>
                Clear Cart
            </button>
        </div>
    );
};

export default CartSidebar;