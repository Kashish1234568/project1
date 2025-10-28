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
        <img
          src={item.img || "/images/paneer buttor masala.jpg"} // ✅ fallback if no image
          alt={item.name}
          className="food-img"
          onError={(e) => (e.target.src = "/images/paneer buttor masala.jpg")} // ✅ handle missing image
        />
        <img
          src={item.img || "/images/gulab jamun.jpg"} // ✅ fallback if no image
          alt={item.name}
          className="food-img"
          onError={(e) => (e.target.src = "/images/gulab jamun.jpg")} // ✅ handle missing image
        />
        <img
          src={item.img || "/images/garlic naan.jpg"} // ✅ fallback if no image
          alt={item.name}
          className="food-img"
          onError={(e) => (e.target.src = "/images/garlic naan.jpg")} // ✅ handle missing image
        />
        <img
          src={item.img || "/images/biryani.jpg"} // ✅ fallback if no image
          alt={item.name}
          className="food-img"
          onError={(e) => (e.target.src = "/images/biryani.jpg")} // ✅ handle missing image
        />
        <img
          src={item.img || "/images/hakka noodles.jpg"} // ✅ fallback if no image
          alt={item.name}
          className="food-img"
          onError={(e) => (e.target.src = "/images/hakka noodles.jpg")} // ✅ handle missing image
        />
        <img
          src={item.img || "/images/cold coffee.jpg"} // ✅ fallback if no image
          alt={item.name}
          className="food-img"
          onError={(e) => (e.target.src = "/images/cold coffee.jpg")} // ✅ handle missing image
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
