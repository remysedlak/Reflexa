import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Corrected import path

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-text">
          Reflexa
        </Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>
      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/" className="navbar-link">Home</Link></li>
        <li><Link to="/entry" className="navbar-link">New Entry</Link></li>
        <li><Link to="/journal" className="navbar-link">Journal</Link></li>
        <li><Link to="/insights" className="navbar-link">Insights</Link></li>
        <li><Link to="/about" className="navbar-link">About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;