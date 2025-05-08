import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ReviewQueue.css"; 

const ReviewQueue = () => {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/posters")
      .then(res => res.json())
      .then(data => {
        const pending = data.filter(
          p => p.status === "submitted" || p.status === "resubmitted"
        );
        setPosters(pending);
      });
  }, []);

  const updateStatus = async (id, newStatus) => {
    const reviewer_id = localStorage.getItem("user_id");

    await fetch(`http://localhost:5000/api/posters/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: newStatus,
        reviewer_id,
      }),
    });

    // remove from queue
    setPosters(posters.filter(p => p.id !== id));
  };

  return (
    <div className="review-queue">
      <h2>Posters Awaiting Review</h2>
      {posters.length === 0 && <p>No posters to review.</p>}
      {posters.map(poster => (
        <div key={poster.id} className="poster-card">
          <h3>{poster.title}</h3>
          <p>{poster.description}</p>

          <div className="button-row">
            <Link to={`/admindash/editor/${poster.id}`}>
              <button className="review-btn">Review & Annotate</button>
            </Link>
            <button
              onClick={() => updateStatus(poster.id, "needs_edits")}
              className="edit-btn"
            >
              Request Edits
            </button>
            <button
              onClick={() => updateStatus(poster.id, "approved")}
              className="approve-btn"
            >
              Approve
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewQueue;
