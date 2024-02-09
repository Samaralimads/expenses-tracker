import React from "react";
import "./Header.css";
import { Outlet } from "react-router-dom";

function Header() {
  return (
    <div>
      Header
      <Outlet />
    </div>
  );
}

export default Header;
