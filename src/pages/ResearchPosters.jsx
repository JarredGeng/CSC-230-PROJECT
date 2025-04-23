

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ResearchPosters.css";
import SearchBar from "../Components/SearchBar.jsx"; 
import "../styles/Searchbar.css"; // Import the CSS for the SearchBar  


const ResearchPosters = () => {
  const [posters, setPosters] = useState([]);
  const navigate = useNavigate();


  


  const fetchPosters = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posters"); // Adjust the URL as needed
      setPosters(response.data);
    } catch (error) {
      console.error("Error fetching posters:", error);
    }
  }; 

  const handleClear = () => {
    fetchPosters(); // Fetch all posters when clearing the search
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/posters")
      .then((res) => setPosters(res.data))
      .catch((err) => console.error("Error fetching posters:", err));
    fetchPosters(); 
  }, []);

  

  const handleSearch = (resultd) => {
    console.log("Search results:", resultd); // Shit your looking for logged in
    setPosters(resultd); // Update posters with search results
  };

  const openInJournal = (index) => {
    navigate(`/journal/${index}`);
  };

  return (
    <div className="page-wrapper">
      <div className="container" style={{ backgroundColor: '#f9f9f9', padding: '60px 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#000', marginBottom: '40px' }}>Research Posters</h2>
        <div style={{ marginBottom: '30px', maxWidth: '500px', margin: '0 auto' }}>
          <SearchBar onSearch={handleSearch} onClear={handleClear} /> {/* Using handle in Searchbar here !! */}  
        </div>
        <div className="posters-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto' }}>
          {posters.map((poster) => (
            <div
              key={poster.id}
              className="poster-item"
              style={{ backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', padding: '15px', textAlign: 'center', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
              onClick={() => openInJournal(poster.id)}
            >
              <img src={poster.thumbnail_url || poster.file_url} alt={poster.title} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }} />
              <h3 style={{ fontSize: '1.1rem', color: '#000', marginBottom: '8px' }}>{poster.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#333', marginBottom: '12px' }}>{poster.description}</p>
              <p style={{ fontSize: '0.8rem', color: '#777' }}>Click to view full poster</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResearchPosters;
