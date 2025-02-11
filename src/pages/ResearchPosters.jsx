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
      <h1>Research Posters</h1>
      <ul>
        {posters.map((poster) => (
          <li key={poster.id}>
            <h2>{poster.title}</h2>
            <p>{poster.description}</p>
            <a href={poster.file_path} target="_blank" rel="noopener noreferrer">View Poster</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResearchPosters;

