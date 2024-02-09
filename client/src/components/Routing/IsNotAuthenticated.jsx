import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const IsNotAuthenticated = () => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading
  if (isLoading) {
    return <p>Loading</p>;
  }

  // If the user is logged in, navigate to their dashboard
  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }
  // If the user is not logged in, allow to see the login/signup and landing pages
  return <Outlet />;
};

export default IsNotAuthenticated;
