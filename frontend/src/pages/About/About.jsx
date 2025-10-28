// frontend/src/pages/About.jsx
import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About <span>QR Dine</span></h1>
      <p className="tagline">Smart • Fast • Contactless Dining</p>

      <p className="about-text">
        QR Dine is a smart and modern dining solution designed to bring convenience to restaurants
        and customers. Our digital menu and ordering system eliminates long wait times and makes
        dining easier and faster. Just scan, order, and enjoy your meal!
      </p>

      <p className="about-text">
        Whether you're managing a restaurant or enjoying your meal as a customer, QR Dine ensures
        a smooth and delightful dining experience with smart technology.
      </p>

      <h3>✨ Why Choose QR Dine?</h3>
      <ul className="features-list">
        <li>📱 Contactless digital menu and ordering</li>
        <li>⚡ Super fast and easy to use</li>
        <li>✅ Real-time order tracking</li>
        <li>🍽️ Better customer satisfaction</li>
        <li>🛡️ Secure & reliable ordering system</li>
        <li>📊 Smart analytics for restaurants</li>
      </ul>

      <div className="mission-box">
        <h3>🎯 Our Mission</h3>
        <p>
          To transform traditional restaurant service into a smarter, faster and hassle-free dining
          experience using the power of technology.
        </p>
      </div>
    </div>
  );
};

export default About;
