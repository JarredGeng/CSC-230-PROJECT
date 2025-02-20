import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">UT Criminology Institute for Research and Training</Link>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><Link to="/PosterForm">Posterform</Link></li>
        <li><Link to="/posters">Research Posters</Link></li>
        <li><Link to="/journal">Journal</Link></li>
        <li><Link to="/resources">Resources</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/admin">Sign in</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
