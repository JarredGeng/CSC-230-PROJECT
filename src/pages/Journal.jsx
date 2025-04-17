import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Journal = () => {
  const { id } = useParams();
  const [poster, setPoster] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/posters`)
      .then((res) => res.json())
      .then((data) => {
        const posterData = data[parseInt(id)];
        if (!posterData) {
          setError("Poster not found.");
        } else {
          setPoster(posterData);
        }
      })
      .catch((err) => {
        console.error("Error loading poster:", err);
        setError("Failed to load poster.");
      });
  }, [id]);

  if (error) {
    return (
      <div style={{ padding: "100px 40px", textAlign: "center" }}>
        <h2 style={{ color: "red" }}>{error}</h2>
      </div>
    );
  }

  if (!poster) {
    return (
      <div style={{ padding: "100px 40px", textAlign: "center" }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#fff", padding: "60px 40px", color: "#000", fontFamily: "Arial, sans-serif", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>{poster.title}</h1>
      <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "30px" }}>{poster.description}</p>

      <iframe
        src={poster.file_url}
        title="Poster PDF"
        width="100%"
        height="600px"
        style={{ border: "1px solid #ccc", borderRadius: "8px" }}
      />
    </div>
  );
};

export default Journal;
