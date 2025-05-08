import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setDropdownOpen(false); // close dropdown on route change
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const goToDashboard = () => {
    if (role === "admin") {
      navigate("/admindash");
    } else {
      navigate("/studentdash");
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span style={{ color: "#d4af37", fontWeight: "bold" }}>UT</span> Criminology Institute for Research and Training
      </Link>
      <ul className="nav-links">
        <li><Link to="/posters">Posters</Link></li>
        <li><Link to="/resources">Resources</Link></li>
        <li><Link to="/faq">FAQ</Link></li>

        {name ? (
          <li className="user-dropdown">
            <button className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {name} <span style={{ fontSize: "12px" }}>▼</span>
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li onClick={goToDashboard}>Dashboard</li>
                <li onClick={handleLogout} className="logout">Log Out</li>
              </ul>
            )}
          </li>
        ) : (
          <li><Link to="/login">Sign In</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
