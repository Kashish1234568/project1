import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">QR Dine</h2>
      </div>

      <div className="nav-center">
        <Link to="/">Home</Link>
        <Link to="/m/demo">Menu</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="nav-right">
        <Link to="/admin/menu" className="btn admin-btn">Admin</Link>
        <Link to="/staff/orders" className="btn staff-btn">Staff</Link>
        <Link to="/m/demo" className="btn cust-btn">Customer</Link>
        <Link to="/login" className="btn login-btn">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
