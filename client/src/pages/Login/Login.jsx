import "./Login.css";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import myApi from "../../api/apiHandler";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  //call useState hook and provide initial value
  //returns an array with current state value and a function to update that value.
  const navigate = useNavigate();

  // Accessing authentication context
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    myApi
      .post(`/api/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Welcome back!</h2>
      <p className="form-info">Please log in with your credentials</p>

      <div className="demo-banner">
        <p>
          <strong>Demo login available:</strong>
        </p>
        <p>
          Email: <code>john@example.com</code>
        </p>
        <p>
          Password: <code>password123</code>
        </p>
        <button
          type="button"
          className="demo-button"
          onClick={() => {
            setEmail("demo@example.com");
            setPassword("123456");
          }}
        >
          Use demo login
        </button>
      </div>

      <form onSubmit={handleLoginSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePassword}
            autoComplete="off"
          />
        </div>

        <button className="form-button" type="submit">
          Log In
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>
        Don't have an account yet?{" "}
        <Link to="/signup" className="form-link">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;
