import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="navbar"
    >
      <div className="navbar-container">
        <h1 className="logo">SmartCampus</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/canteen">Canteen</Link>
          <Link to="/lostfound">Lost & Found</Link>
          <Link to="/scholarships">Scholarships</Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
