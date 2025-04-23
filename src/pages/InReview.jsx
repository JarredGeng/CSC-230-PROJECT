import React from "react";
import "../styles/InReview.css";

const InReview = () => {
  const posterStatus = "under_review"; // dynamic later
  const stages = ["submitted", "under_review", "approved", "published"];

  return (
    <div className="status-wrapper">
      <h2>Submission Progress</h2>
      <div className="status-bar">
        {stages.map((stage, index) => {
          const isComplete = stages.indexOf(posterStatus) > index;
          const isCurrent = posterStatus === stage;

          return (
            <div key={stage} className="status-step">
              <div className={`circle ${isComplete ? "complete" : isCurrent ? "current" : ""}`}>
                {isComplete ? "✓" : index + 1}
              </div>
              <p>{stage.replace("_", " ")}</p>
              {index !== stages.length - 1 && (
                <div className={`bar ${stages.indexOf(posterStatus) > index ? "filled" : ""}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InReview;
