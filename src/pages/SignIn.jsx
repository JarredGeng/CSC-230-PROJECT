import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext"; // Import AuthContext
import "../styles/SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Access login function

  const handleRoleSelection = (role) => {
    login(role); // Save role in context
    navigate(`/login/${role.toLowerCase()}`);
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h1>Sign In</h1>
        <p>Select your role:</p>
        <div className="role-buttons">
          <button className="role-btn" onClick={() => handleRoleSelection("Student")}>Student</button>
          <button className="role-btn" onClick={() => handleRoleSelection("Admin")}>Admin</button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
