import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import Carosel from "../Components/Carosel.jsx";

const Home = () => {
  return (
    <div className="home-page">

      {/* About CIRT Section */}
      <section className="about-cirt">
        <div className="about-container">
          <h2 className="section-heading">About the Institute</h2>
          <p>
            The Criminology Institute for Research and Training (CIRT) at the University of Tampa 
            serves as a hub for research, professional development, and collaboration in the 
            field of criminology and criminal justice. We connect students, faculty, and 
            justice agencies through innovative research, academic publishing, and hands-on training.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <h2 className="section-heading">Our Impact</h2>
        <div className="stats-grid">
          <div className="stat-card"><h3>120+</h3><p>Posters Submitted</p></div>
          <div className="stat-card"><h3>$500K+</h3><p>Grants Awarded</p></div>
          <div className="stat-card"><h3>12</h3><p>Agency Partnerships</p></div>
        </div>
      </section>

      {/* Carousel */}
      <section className="Carosel-section">
        <Carosel />
      </section>

      {/* Happening Now */}
      <section className="news-section">
        <h2 className="section-heading">Happening Now</h2>
        <div className="news-grid">
          <div className="news-card">
            <h3>Fall 2025 Research Symposium</h3>
            <p>Join us in November for the latest in student and faculty criminology research. Submission deadlines are Oct 15.</p>
          </div>
          <div className="news-card">
            <h3>Faculty Roundtable Series</h3>
            <p>Bi-weekly faculty-led discussions on justice reform, policy, and contemporary issues. Open to all students.</p>
          </div>
          <div className="news-card">
            <h3>Data Analysis Workshop</h3>
            <p>Hands-on training with SPSS and R for criminology students. Hosted in partnership with the Department of Mathematics.</p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="quick-links">
        <h2 className="section-heading">Quick Links</h2>
        <div className="cards-grid">
          <Link to="/posters" className="card">
            <h3>Research Posters</h3>
            <p>Explore student poster submissions.</p>
          </Link>
          <Link to="/journal" className="card">
            <h3>Journal</h3>
            <p>Faculty & graduate student publications.</p>
          </Link>
          <Link to="/resources" className="card">
            <h3>Resources</h3>
            <p>Research guides & career development tools.</p>
          </Link>
          <Link to="/faq" className="card">
            <h3>FAQ</h3>
            <p>Answers to common questions.</p>
          </Link>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 CIRT - Criminology Institute for Research & Training | University of Tampa</p>
        <p>Contact: cirt@ut.edu | (813) 555-1234</p>
      </footer>
    </div>
  );
};

export default Home;
