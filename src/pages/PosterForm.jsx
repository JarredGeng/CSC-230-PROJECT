import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PosterForm.css";

const PosterForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [posters, setPosters] = useState([]);

  // Fetch existing posters
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/posters")
      .then((response) => setPosters(response.data))
      .catch((error) => console.error("Error fetching posters:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      alert("You must be logged in to submit a poster.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("user_id", user_id);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/posters", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message);
      setTitle("");
      setDescription("");
      setFile(null);
      setPosters([...posters, response.data.poster]); 
    } catch (error) {
      console.error("Error submitting poster:", error);
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div className="poster-form-container">
      <h2>Submit a Research Poster</h2>
      <form onSubmit={handleSubmit} className="poster-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Upload File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>

      <div className="poster-list">
        <h3>Uploaded Posters</h3>
        {posters.length === 0 && <p>No posters uploaded yet.</p>}
        {posters.map((poster, index) => (
          <div key={index} className="poster-item">
            <h4>{poster.title}</h4>
            <p>{poster.description}</p>
            {poster.thumbnail_url && (
              <img src={poster.thumbnail_url} alt="Poster thumbnail" width={150} />
            )}
            <p>
              <a href={poster.file_url} target="_blank" rel="noopener noreferrer">
                View Full Poster
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PosterForm;
