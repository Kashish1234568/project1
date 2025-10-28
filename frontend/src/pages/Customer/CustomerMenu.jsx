// frontend/src/pages/Customer/CustomerMenu.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../api/axios';
import { useCart } from '../../contexts/CartContext';
import MenuList from '../../components/Customer/MenuList'; // Component for displaying items
import CartSidebar from '../../components/Customer/CartSidebar'; // Component for cart summary

const CustomerMenu = () => {
    const { qrSlug } = useParams();
    const { tableContext, setContext, cartCount } = useCart();
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Context aur Menu Data Fetch karna
    useEffect(() => {
        const fetchContextAndMenu = async () => {
            try {
                // 1. Table Context Resolve karna (QR Landing)
                if (!tableContext) {
                    const contextRes = await API.get(`/tables/menu/by-table/${qrSlug}`);
                    // setContext will store { tableId, tableNumber } in CartContext
                    setContext(contextRes.data.tableId, contextRes.data.tableNumber);
                }

                // 2. Menu Items aur Categories Fetch karna
                const [itemsRes, categoriesRes] = await Promise.all([
                    API.get('/menu/items'), // We can add search/filter params here later
                    // API.get('/menu/categories')
                ]);
                
                setMenuItems(itemsRes.data.items);
                setCategories([]);

            } catch (err) {
                console.error("Failed to load menu data:", err);
                setError('Could not load menu. Please scan the QR code again.');
            } finally {
                setLoading(false);
            }
        };

        fetchContextAndMenu();
    }, [qrSlug, tableContext, setContext]);

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading Menu...</div>;
    if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>Error: {error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            {/* 🎯 Kahaan Image Lagani Hai: Header/Logo aur Table Context */}
            <header style={{ textAlign: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                <h1 style={{ color: '#C8102E' }}>Scan & Dine Lite</h1>
                {tableContext && 
                    <p>Ordering for: <strong>Table {tableContext.tableNumber}</strong></p>
                }
            </header>

            <div style={{ display: 'flex', marginTop: '20px' }}>
                {/* 1. Menu Items List (Placeholder) */}
                <div style={{ flex: 3, paddingRight: '20px' }}>
                    <h2>Our Menu</h2>
                    {/* MenuList component will handle Category filtering and displaying items */}
                    <MenuList items={menuItems} categories={categories} /> 
                </div>

                {/* 2. Cart Summary */}
                <div style={{ flex: 1, position: 'sticky', top: '20px', border: '1px solid #ccc', padding: '15px' }}>
                    <CartSidebar /> 
                </div>
            </div>

            {/* Floating Cart Button (Mobile view ke liye) */}
            {cartCount > 0 && (
                <Link to="/cart" style={{ position: 'fixed', bottom: '20px', right: '20px', padding: '15px', backgroundColor: '#32CD32', color: 'white', borderRadius: '50%', textDecoration: 'none', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
                    Cart ({cartCount})
                </Link>
            )}
        </div>
    );
};

export default CustomerMenu;