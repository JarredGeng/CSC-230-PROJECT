import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const API = "http://localhost:5000/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && !name.trim()) {
      alert("Please enter your name.");
      return;
    }

    const payload = isLogin
      ? { email, password }
      : { email, password, name };

    const endpoint = isLogin ? "login" : "register";

    try {
      const res = await axios.post(`${API}/${endpoint}`, payload);

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.user_id);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("name", res.data.name);
        login(res.data.role);
        navigate("/"); 
      } else {
        alert("Registered! Please log in.");
        setIsLogin(true);
        setName("");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>{isLogin ? "Login" : "Register"}</h1>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
        <p style={{ marginTop: "1rem" }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
