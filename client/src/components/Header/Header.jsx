import React from "react";
import "./Header.css";
import { Outlet, Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <header className="header">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img src="/ZenithLogo.png" alt="Logo" className="logo" />
          </Link>
          <span className="brand-name">ZENITH</span>
        </div>
        <nav className="nav-links">
          <ul>
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="signup-btn">
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default Header;
