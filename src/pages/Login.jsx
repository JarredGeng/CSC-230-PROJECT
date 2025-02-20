import React from "react";
import { useParams } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const { role } = useParams(); // Get role from URL

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>{role.charAt(0).toUpperCase() + role.slice(1)} Login</h1>
        <form>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
