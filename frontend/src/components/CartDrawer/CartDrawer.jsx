import React from "react";
import "./CartDrawer.css";

const CartDrawer = ({ open, items, onClose, onRemove }) => {
  const total = items.reduce((s, it) => s + it.price * (it.qty || 1), 0);
  return (
    <div className={`cart-drawer ${open ? "open" : ""}`}>
      <div className="cart-header">
        <h3>Your Cart</h3>
        <button className="btn" onClick={onClose}>Close</button>
      </div>
      <div className="cart-body">
        {items.length === 0 && <p>Your cart is empty</p>}
        {items.map(it => (
          <div className="cart-item" key={it.id}>
            <img src={it.img} alt={it.name} />
            <div className="cart-meta">
              <h4>{it.name}</h4>
              <p>Qty: {it.qty}</p>
              <p>₹ {it.price}</p>
            </div>
            <button onClick={() => onRemove(it.id)} className="btn small">Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <h4>Total: ₹ {total}</h4>
        <button className="btn primary">Checkout</button>
      </div>
    </div>
  );
};

export default CartDrawer;
