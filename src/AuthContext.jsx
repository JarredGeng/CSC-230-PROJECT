import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) setUserRole(savedRole);
  }, []);

  const login = (role) => {
    setUserRole(role);
    localStorage.setItem("userRole", role); // Persist login state
  };

  const logout = () => {
    setUserRole(null);
    localStorage.removeItem("userRole"); // Clear login state
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
