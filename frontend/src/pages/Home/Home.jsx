// frontend/src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import FoodCard from "../../components/FoodCard/FoodCard";

const samplePopular = [
  { id: "p1", name: "Margherita Pizza", price: 229, img: "/assets/sample/pizza.jpg" },
  { id: "p2", name: "Paneer Tikka", price: 199, img: "/assets/sample/paneer.jpg" },
  { id: "p3", name: "Veg Biryani", price: 249, img: "/assets/sample/biryani.jpg" },
];

const Home = () => {
  return (
    <div className="home-page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay">
          <h1 className="hero-title">Welcome to QR Dine — Modern Cafe Dining</h1>
          <p className="hero-sub">Scan. Order. Enjoy. Fast, contactless ordering for a better dining experience.</p>
          <div className="hero-ctas">
            <Link to="/m/menu" className="btn primary">View Menu</Link>
            <Link to="/about" className="btn outline">About Us</Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features container">
        <div className="feature">
          <h3>Scan to Order</h3>
          <p>Scan the QR at your table and instantly access the menu on your phone.</p>
        </div>
        <div className="feature">
          <h3>Fast Service</h3>
          <p>Orders go directly to our staff panel — faster preparation & delivery.</p>
        </div>
        <div className="feature">
          <h3>Real-time Status</h3>
          <p>Track your order from placed → preparing → ready → served.</p>
        </div>
      </section>

      {/* POPULAR */}
      <section className="popular container">
        <h2>Popular Dishes</h2>
        <div className="popular-grid">
          {samplePopular.map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta container">
        <h2>Ready to order?</h2>
        <p>Open the full menu, pick your favourites and checkout — it's that easy.</p>
        <Link to="/m/menu" className="btn primary large">Open Full Menu</Link>
      </section>
    </div>
  );
};

export default Home;
