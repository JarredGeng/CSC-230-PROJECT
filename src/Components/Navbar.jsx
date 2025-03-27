import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        UT Criminology Institute for Research and Training
      </Link>
      <ul className="nav-links">
        <li><Link to="/posters">Research Posters</Link></li>
        <li><Link to="/journal">Journal</Link></li>
        <li><Link to="/resources">Resources</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/PosterForm">Submit a Poster</Link></li>
        <li><Link to="/admin">Sign In</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;