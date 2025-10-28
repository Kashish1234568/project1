// frontend/src/contexts/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Cart: [{ menuItemId, name, price, quantity, notes }]
  const [cart, setCart] = useState([]); 
  const [tableContext, setTableContext] = useState(null); // { tableId, tableNumber }

  // Total price calculation
  const calculateTotals = () => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxRate = 0.05; // 5% example
    const tax = subtotal * taxRate;
    const totalPrice = subtotal + tax;
    return { subtotal, tax, totalPrice };
  };

  const addItemToCart = (item, quantity = 1, notes = '') => {
    const existingItemIndex = cart.findIndex(i => i.menuItemId === item._id);

    if (existingItemIndex > -1) {
      // Agar item pehle se cart mein hai, toh quantity update karo
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += quantity;
      newCart[existingItemIndex].notes = notes; // Notes ko bhi update kar sakte hain
      setCart(newCart);
    } else {
      // Naya item add karo
      const newItem = {
        menuItemId: item._id,
        name: item.name,
        price: item.price,
        quantity: quantity,
        notes: notes,
      };
      setCart([...cart, newItem]);
    }
  };

  const updateItemQuantity = (menuItemId, newQuantity) => {
    if (newQuantity <= 0) {
      // Agar quantity 0 ya usse kam ho, toh remove kar do
      setCart(cart.filter(item => item.menuItemId !== menuItemId));
    } else {
      setCart(cart.map(item => 
        item.menuItemId === menuItemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const setContext = (id, number) => {
    setTableContext({ tableId: id, tableNumber: number });
  };


  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        tableContext,
        setContext,
        addItemToCart, 
        updateItemQuantity, 
        clearCart,
        calculateTotals,
        cartCount: cart.length
      }}
    >
      {children}
    </CartContext.Provider>
  );
};