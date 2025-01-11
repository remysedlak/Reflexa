import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">
      <Link to="/" className="logo-text">
        Reflexa
      </Link>
    </div>
    <ul className="navbar-links">
      <li><Link to="/" className="navbar-link">Home</Link></li>
      <li><Link to="/journal" className="navbar-link">Journal</Link></li>
      <li><Link to="/entry" className="navbar-link">New Entry</Link></li>
      <li><Link to="/insights" className="navbar-link">Insights</Link></li>
      <li><Link to="/about" className="navbar-link">About</Link></li>
    </ul>
  </nav>
);

export default Navbar;
