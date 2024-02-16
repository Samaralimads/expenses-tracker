import "./Signup.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myApi from "../../api/apiHandler";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { username, email, password };

    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state

    myApi
      .post(`/api/auth/signup`, requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Lets get started!</h2>
      <p>Complete all fields to create your account</p>
      <form onSubmit={handleSignupSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            name="name"
            id="name"
            value={username}
            onChange={handleUsername}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmail}
            autoComplete="off"
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
          Sign up
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>
        Already have an account?{" "}
        <Link to="/login" className="form-link">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;
