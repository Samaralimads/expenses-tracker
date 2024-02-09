import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const IsAuthenticated = () => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <p>Loading</p>;
  }
  // If the user is not logged in, redirects to landing page
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  // If the user is logged in, allow to see the page
  return <Outlet />;
};

export default IsAuthenticated;
