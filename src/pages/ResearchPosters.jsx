import React, { useEffect, useState } from "react";
import axios from "axios";

const ResearchPosters = () => {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/posters")  // Fetch from Flask
      .then((res) => setPosters(res.data))
      .catch((err) => console.error("Error fetching posters:", err));
  }, []);

  
  return (
    <div className="container">
      <h2>Research Posters</h2>
      {posters.map((poster, index) => (
          <div key={index} className="poster-item">
            <h3>{poster.title}</h3>
            <p>{poster.description}</p>
            {poster.file_url.endsWith(".jpg") || poster.file_url.endsWith(".png") || poster.file_url.endsWith(".jpeg") ? (
              <img src={poster.file_url} alt={poster.title} className="poster-image" />
            ) : (
              <a href={poster.file_url} target="_blank" rel="noopener noreferrer">View File</a>
            )}
          </div>
        ))}
      </div>
  );
};

export default ResearchPosters;

