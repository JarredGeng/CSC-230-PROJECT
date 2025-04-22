

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ResearchPosters.css"; // Make sure CSS is imported here
import SearchBar from "../Components/SearchBar.jsx"; 
import "../styles/Searchbar.css"; // Import the CSS for the SearchBar  


const ResearchPosters = () => {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    fetchPosters(); 
  }, []);

  const fetchPosters = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posters"); // Adjust the URL as needed
      setPosters(response.data);
    } catch (error) {
      console.error("Error fetching posters:", error);
    }
  };

  const handleSearch = (resultd) => {
    setPosters(resultd); // Update posters with search results
  };

  return (
    <div className="container" style={{ backgroundColor: '#f9f9f9', padding: '60px 20px' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#000', marginBottom: '20px' }}>
        Research Posters !!
      </h2>

      {/* 🔍 Reusable Search Component */}
      <p>SearchBar should be right below <p> </p></p>
      <SearchBar onSearch={handleSearch} />

      <div className="posters-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto' }}>
        {posters.length > 0 ? (
          posters.map((poster, index) => (
            <div key={index} className="poster-item" style={{ backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', padding: '15px', textAlign: 'center' }}>
              <img src={poster.file_url} alt={poster.title} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }} />
              <h3 style={{ fontSize: '1.1rem', color: '#000', marginBottom: '8px' }}>{poster.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#333', marginBottom: '12px' }}>{poster.description}</p>
              {!(poster.file_url.endsWith(".jpg") || poster.file_url.endsWith(".png") || poster.file_url.endsWith(".jpeg")) && (
                <a href={poster.file_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '10px', color: '#4b79a1', textDecoration: 'none', fontWeight: 'bold' }}>View File</a>
              )}
            </div>
          ))
        ) : (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No posters found</p>
        )}
      </div>
    </div>
  );
};

export default ResearchPosters;