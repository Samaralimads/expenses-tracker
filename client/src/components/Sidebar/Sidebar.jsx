import React, { useContext } from "react";
import "./Sidebar.css";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();
  const { logOutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logOutUser();

    navigate("/login");
  };

  return (
    <div>
      Sidebar
      <button onClick={handleLogout}>Logout</button>
      <Outlet />
    </div>
  );
}

export default Sidebar;
