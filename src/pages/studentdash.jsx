import React from "react";
import Sidebar from "../Components/sidebar";
import PosterForm from "./PosterForm";
import InReview from "./InReview";
import { useLocation } from "react-router-dom";
import "../styles/dashboard.css";

const StudentDashboard = () => {
  const location = useLocation();
  const path = location.pathname;

  let content;

  if (path === "/studentdash/posterform") {
    content = <PosterForm />;
  } else if (path === "/studentdash/inreview") {
    content = <InReview />;
  } else {
    content = (
      <>
        <h1>Welcome to the Student Dashboard 🎓</h1>
        <p>You can submit your posters and view others.</p>
      </>
    );
  }

  return (
    <div className="dashboard-page">
      <Sidebar role="student" />
      <div className="dashboard-content">
        {content}
      </div>
    </div>
  );
};

export default StudentDashboard;
