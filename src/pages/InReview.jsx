import React, { useEffect, useState } from "react";
import "../styles/InReview.css";

const InReview = () => {
  const [posters, setPosters] = useState([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    fetch("http://localhost:5000/api/posters")
      .then(res => res.json())
      .then(data => {
        const mine = data.filter(p => p.user_id === userId);
        setPosters(mine);
      });
  }, [userId]);

  const resubmit = async (id) => {
    await fetch(`http://localhost:5000/api/posters/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "resubmitted" })
    });
    alert("Poster resubmitted!");
    window.location.reload();
  };

  const renderStatusBar = (status) => {
    const steps = ["submitted", "needs_edits", "resubmitted", "approved"];
    const currentIndex = steps.indexOf(status);

    return (
      <div className="status-bar">
        {steps.map((step, index) => (
          <div className="status-step" key={step}>
            {index !== 0 && (
              <div
                className={`bar ${index <= currentIndex ? "filled" : ""}`}
                style={{ left: "-50%", right: "50%" }}
              ></div>
            )}
            <div
              className={`circle ${
                index < currentIndex
                  ? "complete"
                  : index === currentIndex
                  ? "current"
                  : ""
              }`}
            >
              {index + 1}
            </div>
            <div className="label">{step.replace("_", " ")}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="inreview-wrapper">
      <h2>Your Posters</h2>
      {posters.length === 0 && <p>No posters submitted yet.</p>}
      {posters.map(poster => (
        <div key={poster.id} className="poster-card">
          <h3>{poster.title}</h3>
          <p>{poster.description}</p>
          {renderStatusBar(poster.status)}
          <a href={poster.file_url} target="_blank" rel="noopener noreferrer">View PDF</a>
          {poster.status === "needs_edits" && (
            <button onClick={() => resubmit(poster.id)}>Resubmit</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default InReview;
