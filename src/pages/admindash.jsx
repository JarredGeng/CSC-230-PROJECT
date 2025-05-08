import React from "react";
import Sidebar from "../Components/sidebar";
import { Outlet } from "react-router-dom";
import "../styles/dashboard.css";

const AdminDashboard = () => {
  return (
    <div className="dashboard-page">
      <Sidebar role="admin" />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
