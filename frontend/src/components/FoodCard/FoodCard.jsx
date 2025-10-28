// FoodCard.jsx
import React from "react";
import "./FoodCard.css";

const FoodCard = ({ item, onAdd }) => {
  return (
    <div className="food-card">
      <div className="food-img-wrap">
        <img
          src={item.img || "/images/spring roll.jpg"} // ✅ fallback if no image
          alt={item.name}
          className="food-img"
          onError={(e) => (e.target.src = "/images/spring roll.jpg")} // ✅ handle missing image
        />
      </div>
      <div className="food-body">
        <h3>{item.name}</h3>
        <p className="price">₹ {item.price}</p>
        <button
          className="btn primary small"
          onClick={() => onAdd && onAdd(item)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
