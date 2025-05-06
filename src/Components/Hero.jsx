import React from "react";
import "../styles/Hero.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import heroImage from "../assets/hero-image.jpg"; // Make sure the image is in the assets folder

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <h1>Welcome to CIRT</h1>
        <p>Your hub for academic research, networking, and collaboration.</p>
        <Link to="/posters">
           <button>Explore Research</button>
      </Link>
      </div>
    </section>
  );
};

export default Hero;
