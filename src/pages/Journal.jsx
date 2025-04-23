import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Journal = () => {
  const { id } = useParams();
  const [poster, setPoster] = useState(null);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const currentUserID = localStorage.getItem("user_id");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/posters")
      .then((res) => res.json())
      .then((data) => {
        const posterData = data.find((p) => p.id == id);
        if (!posterData) {
          setError("Poster not found.");
        } else {
          setPoster(posterData);
          fetchComments(posterData.id);
        }
      })
      .catch((err) => {
        console.error("Error loading poster:", err);
        setError("Failed to load poster.");
      });
  }, [id]);

  const fetchComments = async (posterId) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/comments/${posterId}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setComments(data);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error("Failed to fetch comments:", err);
      setComments([]);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`http://127.0.0.1:5000/api/comments/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          user_id: currentUserID,
        }),
      });

      if (res.ok) {
        setNewComment("");
        fetchComments(id);
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const timeAgo = (dateString) => {
    const seconds = Math.floor((Date.now() - new Date(dateString)) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(seconds / 86400);

    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 10) return `${minutes}m ago`;
    if (minutes < 60) return `Updated ${minutes} minutes ago`;
    if (hours < 24) return `Updated ${hours} hour${hours > 1 ? "s" : ""} ago`;
    return `Updated ${days} day${days > 1 ? "s" : ""} ago`;
  };

  if (error) {
    return (
      <div className="page-wrapper" style={{ textAlign: "center" }}>
        <h2 style={{ color: "red" }}>{error}</h2>
      </div>
    );
  }

  if (!poster) {
    return (
      <div className="page-wrapper" style={{ textAlign: "center" }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="page-wrapper" style={{ maxWidth: "900px", margin: "0 auto", color: "#000", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>{poster.title}</h1>
      <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "30px" }}>{poster.description}</p>

      <iframe
        src={poster.file_url}
        title="Poster PDF"
        width="100%"
        height="600px"
        style={{ border: "1px solid #ccc", borderRadius: "8px" }}
      />

      <div style={{ marginTop: "50px" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "10px" }}>Comments</h2>

        <form onSubmit={handleCommentSubmit} style={{ marginBottom: "30px" }}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Leave a comment..."
            rows="4"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "1rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#d32f2f",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Post Comment
          </button>
        </form>

        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((c, index) => (
            <div
              key={index}
              style={{
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
                marginBottom: "10px",
              }}
            >
              <p style={{ margin: "0 0 5px 0" }}>{c.content}</p>
              <small style={{ color: "#888" }}>
                Posted by {c.name || "Anonymous"} — {timeAgo(c.created_at)}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Journal;
