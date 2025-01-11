import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        
        <Link to="/" className="logo-text"><h1>Reflexa</h1></Link>
      </div>
      <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <li><Link to="/" className="navbar-link">Hom</Link></li>
        <li><Link to="/journal" className="navbar-link">Journal</Link></li>
        <li><Link to="/entry" className="navbar-link">New Entry</Link></li>
       {/*<li><Link to="/calendar" className="navbar-link">Calendar</Link></li>*/}
        <li><Link to="/insights" className="navbar-link">Insights</Link></li>
        <li><Link to="/about" className="navbar-link">About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;