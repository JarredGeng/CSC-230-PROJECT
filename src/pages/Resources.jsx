import React from "react";

const Resources = () => {
  return (
    <div style={{ backgroundColor: "#fff", padding: "100px 40px", color: "#000", fontFamily: "Arial, sans-serif", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "60px", fontSize: "2.8rem" }}>Resources</h1>
      <div style={{ marginBottom: "40px" }}>
        <h3 style={{ marginBottom: "10px", fontSize: "1.5rem" }}>Research Guides</h3>
        <p style={{ lineHeight: "1.7", color: "#555" }}>
          Comprehensive step-by-step guides for quantitative and qualitative research design tailored for criminology and social sciences.
        </p>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h3 style={{ marginBottom: "10px", fontSize: "1.5rem" }}>Data Analysis Tutorials</h3>
        <p style={{ lineHeight: "1.7", color: "#555" }}>
          Video and written tutorials covering SPSS, R, and Python for statistical analysis relevant to criminal justice research.
        </p>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h3 style={{ marginBottom: "10px", fontSize: "1.5rem" }}>Writing and Formatting Resources</h3>
        <p style={{ lineHeight: "1.7", color: "#555" }}>
          APA 7th edition style templates, citation tools, and academic writing best practices for submitting to journals.
        </p>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h3 style={{ marginBottom: "10px", fontSize: "1.5rem" }}>Career Development Materials</h3>
        <p style={{ lineHeight: "1.7", color: "#555" }}>
          Resume building guides, interview preparation tips, and networking strategies for future professionals in the field.
        </p>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h3 style={{ marginBottom: "10px", fontSize: "1.5rem" }}>Professional Association Links</h3>
        <p style={{ lineHeight: "1.7", color: "#555" }}>
          Direct links to national criminology and criminal justice associations, conferences, and academic resources.
        </p>
      </div>
    </div>
  );
};

export default Resources;
