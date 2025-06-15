import React from 'react';
import './TopFold.css';
import CarLogo from '../assets/car-logo.png'; // your spinning logo
import { Link } from 'react-router-dom';

function TopFold() {
  return (
    <div className="topfold-container">
      <nav className="navbar">
        <div className="logo">
        <div className="logo-text">Finance<span className="logo-highlight">Bros</span></div>
        </div>
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/signup">
            <button className="signup-btn">Sign Up</button>
          </Link>
        </div>
      </nav>

      <header className="hero-section">
        <span className="badge">CRM 1.0</span>
        <h1>Process car loan data for <span className="highlight">Faster Insights</span></h1>
        <p>Track repayments, manage applications, and empower customers — all from one dashboard.</p>
        <div className="cta-buttons">
          <button className="btn-primary">Start Free</button>
          <button className="btn-outline">Sign up with Google</button>
        </div>
      </header>
    </div>
  );
}

export default TopFold;
