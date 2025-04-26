import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import Carosel from "../Components/Carosel.jsx"; // Import the Carosel component
const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-banner">
        <div className="hero-overlay">
          <h1>Welcome to CIRT</h1>
          <p>Your hub for research, training, and student engagement.</p>
        </div>
      </section>

      <section className="Carosel-section" style={{ padding: '40px 0', backgroundColor: '#f0f0f0' }}>
      <Carosel /> {/* Include the Carosel component here */}  
      </section>


      <section className="quick-links">
        <h2>Quick Links</h2>
        <div className="cards-grid">
          <Link to="/posters" className="card">
            <h3>Research Posters</h3>
            <p>Explore student research poster submissions.</p>
          </Link>
          <Link to="/journal" className="card">
            <h3>Journal</h3>
            <p>View faculty and graduate student publications.</p>
          </Link>
          <Link to="/resources" className="card">
            <h3>Resources</h3>
            <p>Find guides and learning materials for students and professionals.</p>
          </Link>
          <Link to="/faq" className="card">
            <h3>FAQ</h3>
            <p>Common questions answered about research and submission processes.</p>
          </Link>
        </div>
      </section>

      <section className="info-sections">
        <div className="info-block">
          <div>
            <h2>Student Research Opportunities</h2>
            <p>
              CIRT provides students with opportunities to showcase and publish their academic work. Participate in our bi-annual symposium or submit to the CIRT Journal.
            </p>
          </div>
        </div>

        <div className="info-block reverse">
          <div>
            <h2>Faculty Involvement</h2>
            <p>
              Collaborate with faculty, contribute to peer review, and stay engaged with cutting-edge criminology research.
            </p>
          </div>
        </div>

        <div className="info-block">
          <div>
            <h2>Networking & Career Development</h2>
            <p>
              Connect with agencies and professionals in the field to build relationships and find opportunities for your career in criminal justice.
            </p>
          </div>
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