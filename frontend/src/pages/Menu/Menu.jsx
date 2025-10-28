// frontend/src/pages/Menu.jsx
import React, { useState, useEffect } from "react";
import "./Menu.css";
import CategorySidebar from "../../components/CategorySidebar/CategorySidebar";
import FoodCard from "../../components/FoodCard/FoodCard";
import CartDrawer from "../../components/CartDrawer/CartDrawer";


// SAMPLE DATA — replace with API later
const sampleCategories = [
  { id: "c1", name: "Starters" },
  { id: "c2", name: "Main Course - Veg" },
  { id: "c3", name: "Desserts" },
  { id: "c4", name: "Breads" },
  { id: "c5", name: "Rice & Biryani" },
  { id: "c6", name: "Chinese" },
  { id: "c7", name: "Beverages" },
];

const sampleItems = [
   { id: "i1", name: "Spring Roll", price: 110, category: "Starters", img: "/images/spring roll.jpg" },
  { id: "i2", name: "Paneer Butter Masala", price: 220, category: "Main Course - Veg", img: "/images/paneer buttor masala.jpg" },
   { id: "i3", name: "Gulab Jamun", price: 70, category: "Desserts", img: "/images/gulab jamun.jpg" },
   { id: "i4", name: "Garlic Naan", price: 40, category: "Breads", img: "/images/garlic naan.jpg" },
   { id: "i5", name: "Chicken Biryani", price: 250, category: "Rice & Biryani", img: "/images/biryani.jpg" },
    { id: "i6", name: "Hakka Noodles", price: 180, category: "Chinese", img: "/images/hakka noodles.jpg" },
   { id: "i7", name: "Cold Coffee", price: 90, category: "Beverages", img: "/images/cold coffee.jpg" },
  
  ];


const Menu = () => {
  const [categories] = useState(sampleCategories);
  const [items, setItems] = useState(sampleItems);
  const [selectedCat, setSelectedCat] = useState("Starters");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Filter and sort price low->high as requested
  const visibleItems = items
    .filter(i => i.category === selectedCat)
    .sort((a,b) => a.price - b.price);

  const addToCart = (item) => {
    setCartItems(prev => {
      const exists = prev.find(p => p.id === item.id);
      if (exists) return prev.map(p => p.id === item.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...item, qty: 1 }];
    });
  };
  const removeFromCart = (id) => setCartItems(prev => prev.filter(p => p.id !== id));
  const toggleCart = () => setCartOpen(v => !v);

  return (
    <div className="menu-page container">
      <div className="menu-layout">
        <aside className="sidebar">
          <CategorySidebar categories={categories} selected={selectedCat} onSelect={setSelectedCat} />
        </aside>

        <main className="menu-main">
          <div className="menu-top">
            <h2>{selectedCat}</h2>
            <div>
              <button className="btn primary" onClick={toggleCart}>View Cart ({cartItems.length})</button>
            </div>
          </div>

          <div className="items-grid">
            {visibleItems.map(it => (
              <FoodCard key={it.id} item={it} onAdd={() => addToCart(it)} />
            ))}
          </div>
        </main>
      </div>

      <CartDrawer open={cartOpen} items={cartItems} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />
    </div>
  );
};

export default Menu;
