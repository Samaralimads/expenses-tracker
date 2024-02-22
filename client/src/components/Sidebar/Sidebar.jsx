import React, { useContext } from "react";
import "./Sidebar.css";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "../Avatar/Avatar";
function Sidebar() {
  const navigate = useNavigate();
  const { logOutUser } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    logOutUser();

    navigate("/login");
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div>
          <div className="logo-container">
            <img src="/ZenithLogo.png" alt="Logo" className="logo" />
            <span className="brand-name">ZENITH</span>
          </div>

          <div className="welcome-back">Welcome back,</div>
          <div className="user-container">
            <Avatar />
            <span className="username">{user.username}</span>
          </div>
        </div>
        <div className="nav-links">
          <ul>
            <li>
              <img src="/chart.png" alt="chart" className="link-img" />
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <img src="budget.png" alt="budget" className="link-img" />
              <Link to="/transactions">Transactions</Link>
            </li>
          </ul>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <Outlet />
    </div>
  );
}

export default Sidebar;
