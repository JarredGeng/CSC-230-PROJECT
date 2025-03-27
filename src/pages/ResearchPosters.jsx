import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ResearchPosters.css"; // Make sure CSS is imported here

const ResearchPosters = () => {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/posters")  // Fetch from Flask
      .then((res) => setPosters(res.data))
      .catch((err) => console.error("Error fetching posters:", err));
  }, []);

  return (
    <div className="container" style={{ backgroundColor: '#f9f9f9', padding: '60px 20px' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#000', marginBottom: '40px' }}>Research Posters</h2>
      <div className="posters-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto' }}>
        {posters.map((poster, index) => (
          <div key={index} className="poster-item" style={{ backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', padding: '15px', textAlign: 'center', transition: 'transform 0.2s, box-shadow 0.2s' }}>
            <img src={poster.file_url} alt={poster.title} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }} />
            <h3 style={{ fontSize: '1.1rem', color: '#000', marginBottom: '8px' }}>{poster.title}</h3>
            <p style={{ fontSize: '0.9rem', color: '#333', marginBottom: '12px' }}>{poster.description}</p>
            {!(poster.file_url.endsWith(".jpg") || poster.file_url.endsWith(".png") || poster.file_url.endsWith(".jpeg")) && (
              <a href={poster.file_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '10px', color: '#4b79a1', textDecoration: 'none', fontWeight: 'bold' }}>View File</a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchPosters;