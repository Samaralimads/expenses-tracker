import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <h1>Where financial freedom meets its peak</h1>
      <div className="dashboard-container">
        <section className="text-section">
          <p className="dashboard-text">
            Zenith is the ultimate expense tracker for modern adults seeking to
            conquer their financial goals and reach the pinnacle of economic
            independence. Our intuitive platform lets you effortlessly monitor
            your spending, save smarter, and make savvy decisions with
            confidence.
          </p>
        </section>
        <section className="img-section">
          <img
            className="landing-img"
            src="/placeholder.png"
            alt="placeholderimg"
          />
        </section>
      </div>
      <Link to="/signup" className="dashboard-btn">
        Get Started
      </Link>
    </div>
  );
}

export default LandingPage;
