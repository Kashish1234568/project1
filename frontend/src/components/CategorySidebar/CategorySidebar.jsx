import React from "react";
import "./CategorySidebar.css";

const CategorySidebar = ({ categories, selected, onSelect }) => {
  return (
    <div className="category-list">
      {categories.map(c => (
        <div
          key={c.id}
          className={`category-item ${selected === c.name ? "active" : ""}`}
          onClick={() => onSelect(c.name)}
        >
          {c.name}
        </div>
      ))}
    </div>
  );
};

export default CategorySidebar;
