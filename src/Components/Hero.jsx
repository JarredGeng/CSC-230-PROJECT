import React from "react";
import "../styles/Hero.css";
import heroImage from "../assets/hero-image.jpg"; // Make sure the image is in the assets folder

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <h1>Welcome to CIRT</h1>
        <p>Your hub for academic research, networking, and collaboration.</p>
        <button className="hero-btn">Explore Research</button>
      </div>
    </section>
  );
};

export default Hero;
