import React from "react";
import "./Header.css";
import { Outlet, Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <header className="header">
        <div className="header-logo-container">
          <Link to="/" className="header-logo-link">
            <img src="/ZenithLogo.png" alt="Logo" className="header-logo" />
          </Link>
          <span className="brand-name">ZENITH</span>
        </div>
        <nav className="header-links">
          <ul>
            <li>
              <Link to="/" className="header-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className="header-link">
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
