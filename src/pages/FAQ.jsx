import React from "react";
import "../styles/FAQ.css";

const FAQ = () => {
  return (
    <div className="faq-container" style={{ backgroundColor: "#fff", padding: "100px 40px", color: "#000", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "60px", fontSize: "2.8rem" }}>Frequently Asked Questions</h1>
      <div className="faq-item" style={{ marginBottom: "40px" }}>
        <h3 style={{ marginBottom: "10px", fontSize: "1.5rem" }}>What is CIRT?</h3>
        <p style={{ lineHeight: "1.7", color: "#555" }}>
          CIRT stands for the Criminology Institute for Research and Training. We are dedicated to fostering academic excellence, collaborative research, and professional development.
        </p>
      </div>

      <div className="faq-item" style={{ marginBottom: "40px" }}>
        <h3 style={{ marginBottom: "10px", fontSize: "1.5rem" }}>Who can submit a research poster?</h3>
        <p style={{ lineHeight: "1.7", color: "#555" }}>
          Undergraduate and graduate students in criminology and related fields are encouraged to submit their research posters for our bi-annual symposium.
        </p>
      </div>

      <div className="faq-item" style={{ marginBottom: "40px" }}>
        <h3 style={{ marginBottom: "10px", fontSize: "1.5rem" }}>How does the peer-review process work?</h3>
        <p style={{ lineHeight: "1.7", color: "#555" }}>
          Submissions are evaluated by faculty reviewers with expertise in criminal justice disciplines. Authors receive feedback and may be asked to revise before final publication.
        </p>
      </div>

      <div className="faq-item" style={{ marginBottom: "40px" }}>
        <h3 style={{ marginBottom: "10px", fontSize: "1.5rem" }}>Can faculty get involved?</h3>
        <p style={{ lineHeight: "1.7", color: "#555" }}>
          Yes! Faculty can participate as reviewers, mentors, and contributors to the journal and symposium events.
        </p>
      </div>

      <div className="faq-item" style={{ marginBottom: "40px" }}>
        <h3 style={{ marginBottom: "10px", fontSize: "1.5rem" }}>Where can I find resources for research methodology?</h3>
        <p style={{ lineHeight: "1.7", color: "#555" }}>
          The resources section of our website includes guides, tutorials, and academic references to assist with research design, data analysis, and writing.
        </p>
      </div>

      <div className="faq-item" style={{ marginBottom: "40px" }}>
        <h3 style={{ marginBottom: "10px", fontSize: "1.5rem" }}>How can I contact CIRT for more information?</h3>
        <p style={{ lineHeight: "1.7", color: "#555" }}>
          Email us at cirt@ut.edu or call (813) 555-1234 for any additional inquiries.
        </p>
      </div>
    </div>
  );
};

export default FAQ;