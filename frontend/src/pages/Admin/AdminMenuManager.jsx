// frontend/src/pages/Admin/AdminMenuManager.jsx
import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import AdminLayout from '../../components/Admin/AdminLayout';

const AdminMenuManager = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '', price: 0, categoryId: '', imageUrl: '', tags: '' });
    const [newCategory, setNewCategory] = useState({ name: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Items and Categories
    const fetchData = async () => {
        try {
            const [itemsRes, categoriesRes] = await Promise.all([
                API.get('/menu/items?availability=false'), // Fetch all items (even inactive ones)
                API.get('/menu/categories')
            ]);
            setItems(itemsRes.data.items);
            setCategories(categoriesRes.data);
        } catch (err) {
            setError('Failed to fetch menu data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Handle Item Creation
    const handleCreateItem = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            // NOTE: Since we skipped actual file upload, we're sending a dummy URL
            const itemPayload = { 
                ...newItem, 
                price: parseFloat(newItem.price),
                tags: newItem.tags.split(',').map(tag => tag.trim()),
                imageUrl: '/uploads/menu/sample.jpg' // Using a dummy path
            };
            
            await API.post('/menu/items', itemPayload);
            alert('Menu Item created successfully!');
            setNewItem({ name: '', description: '', price: 0, categoryId: '', imageUrl: '', tags: '' });
            fetchData(); // Refresh list
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create item.');
        }
    };

    // Handle Category Creation
    const handleCreateCategory = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await API.post('/menu/categories', newCategory);
            alert('Category created successfully!');
            setNewCategory({ name: '' });
            fetchData(); // Refresh list
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create category.');
        }
    };

    // Handle Delete (Simple example)
    const handleDeleteItem = async (itemId) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            await API.delete(`/menu/items/${itemId}`);
            alert('Item deleted.');
            fetchData();
        } catch (err) {
            alert('Failed to delete item.');
        }
    };

    if (loading) return <AdminLayout>Loading...</AdminLayout>;

    return (
        <AdminLayout current="menu">
            <h2>Menu Manager (Admin)</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ display: 'flex', gap: '30px', marginBottom: '40px' }}>
                {/* Category Creator */}
                <div style={{ flex: 1, border: '1px solid #ddd', padding: '15px' }}>
                    <h3>Create Category</h3>
                    <form onSubmit={handleCreateCategory}>
                        <input type="text" placeholder="Category Name" value={newCategory.name} onChange={(e) => setNewCategory({ name: e.target.value })} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
                        <button type="submit">Create</button>
                    </form>
                    <h4 style={{ marginTop: '20px' }}>Categories List ({categories.length})</h4>
                    <ul>
                        {categories.map(cat => <li key={cat._id}>{cat.name}</li>)}
                    </ul>
                </div>

                {/* Item Creator */}
                <div style={{ flex: 2, border: '1px solid #ddd', padding: '15px' }}>
                    <h3>Create New Item</h3>
                    <form onSubmit={handleCreateItem}>
                        <input type="text" placeholder="Name" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
                        <textarea placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({...newItem, description: e.target.value})} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }}></textarea>
                        <input type="number" placeholder="Price" value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
                        <select value={newItem.categoryId} onChange={(e) => setNewItem({...newItem, categoryId: e.target.value})} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }}>
                            <option value="">Select Category</option>
                            {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                        </select>
                        <input type="text" placeholder="Tags (comma-separated)" value={newItem.tags} onChange={(e) => setNewItem({...newItem, tags: e.target.value})} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
                        <button type="submit">Add Item</button>
                    </form>
                </div>
            </div>

            {/* Item List */}
            <h3>Menu Items List ({items.length})</h3>
            {items.map(item => (
                <div key={item._id} style={{ border: '1px solid #eee', padding: '10px', margin: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>
                        **{item.name}** ({item.categoryId.name}) - ₹{item.price.toFixed(2)} - Status: {item.availability ? 'Active' : 'Inactive'}
                    </span>
                    <div>
                        {/* 🎯 Kahaan Image Lagani Hai: Here you would see the placeholder image */}
                        <img src={`http://localhost:5000${item.imageUrl}`} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}/>
                        <button onClick={() => handleDeleteItem(item._id)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
                        {/* Toggle Availability button will be added here */}
                    </div>
                </div>
            ))}
        </AdminLayout>
    );
};

export default AdminMenuManager;