import React from "react";
import Sidebar from "../Components/sidebar";
import ReviewQueue from "./review";
import PosterEditor from "./PosterEditor";
import FinalizeReview from "./FinalizeReview";
import { useLocation } from "react-router-dom";
import "../styles/dashboard.css";

const AdminDashboard = () => {
  const location = useLocation();
  const path = location.pathname;

  let content;

  if (path === "/admindash/reviewqueue") {
    content = <ReviewQueue />;
  } else if (path === "/admindash/editor") {
    content = <PosterEditor />;
  } else if (path === "/admindash/finalize") {
    content = <FinalizeReview />;
  } else {
    content = (
      <>
        <h1>Welcome to the Admin Dashboard 🛠️</h1>
        <p>Review, edit, and publish student posters from here.</p>
      </>
    );
  }

  return (
    <div className="dashboard-page">
      <Sidebar role="admin" />
      <div className="dashboard-content">
        {content}
      </div>
    </div>
  );
};

export default AdminDashboard;

import { Link } from "react-router-dom";