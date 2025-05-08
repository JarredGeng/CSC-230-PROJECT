import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PosterEditor from "./PosterEditor";

const PosterEditorWrapper = () => {
  const { posterId } = useParams();
  const [poster, setPoster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching poster with ID:", posterId);

    fetch(`http://localhost:5000/api/posters/${posterId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch poster");
        return res.json();
      })
      .then(data => {
        console.log("Fetched poster:", data);
        setPoster(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Poster fetch error:", err);
        setError("Failed to load poster.");
        setLoading(false);
      });
  }, [posterId]);

  if (loading) return <p>Loading poster...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (!poster?.file_url) return <p>Poster has no file_url.</p>;

  return (
    <div>
      <h2>Reviewing: {poster.title}</h2>
      <PosterEditor fileUrl={poster.file_url} />
    </div>
  );
};

export default PosterEditorWrapper;
