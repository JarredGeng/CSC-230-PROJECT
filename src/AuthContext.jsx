import React, { createContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  // Load role from localStorage when app starts
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      setUserRole(savedRole);
    }
  }, []);

  // Called after login to store the user's role
  const login = (role) => {
    setUserRole(role);
    localStorage.setItem("role", role);
  };

  // Called when logging out
  const logout = () => {
    setUserRole(null);
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
