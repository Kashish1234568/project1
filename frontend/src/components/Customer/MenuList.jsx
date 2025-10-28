// frontend/src/components/Customer/MenuList.jsx
import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';

const MenuList = ({ items, categories }) => {
    const { addItemToCart } = useCart();
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    // Simple filter logic
    const filteredItems = items.filter(item => 
        selectedCategory === 'All' || item.categoryId._id === selectedCategory
    );

    return (
        <div>
            {/* Category Filter Buttons */}
            <div style={{ marginBottom: '20px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                <button onClick={() => setSelectedCategory('All')} style={selectedCategory === 'All' ? {fontWeight: 'bold'} : {}}>All</button>
                {categories.map(cat => (
                    <button 
                        key={cat._id} 
                        onClick={() => setSelectedCategory(cat._id)} 
                        style={selectedCategory === cat._id ? {fontWeight: 'bold', marginLeft: '10px'} : {marginLeft: '10px'}}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Items Rendering */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {filteredItems.map(item => (
                    <div key={item._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        
                        {/* 🎯 Kahaan Image Lagani Hai: Food Item ki Image */}
                        <img 
                            src={`http://localhost:5000${item.imageUrl}`} // Backend server se image fetch
                            alt={item.name} 
                            style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }}
                        />
                        
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p><strong>₹{item.price.toFixed(2)}</strong></p>
                        <button 
                            onClick={() => addItemToCart(item, 1)}
                            style={{ backgroundColor: '#28a745', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuList;