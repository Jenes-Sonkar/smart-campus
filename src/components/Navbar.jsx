import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';
import profileIcon from '../assets/profile.png';
import authIcon from '../assets/auth.png';

const Navbar = ({ setShowLogin, isLoggedIn, setIsLoggedIn }) => {

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setShowLogin(true);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="navbar"
    >
      <div className="navbar-container">
        <div className="left-content">
          {isLoggedIn ? (
            <motion.img
              src={profileIcon}
              alt="Profile"
              className="user-icon"
              whileHover={{ scale: 1.1 }}
              onClick={handleLogout}
              title="Click to logout"
            />
          ) : (
            <motion.img
              src={authIcon}
              alt="Login/Signup"
              className="user-icon"
              whileHover={{ scale: 1.1, rotate: 5 }}
              onClick={handleLoginClick}
              title="Click to Login / Signup"
            />
          )}
          <h1 className="logo">SmartCampus</h1>
        </div>

        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/canteen">Canteen</Link>
          <Link to="/lost-found">Lost & Found</Link>
          <Link to="/scholarships">Scholarships</Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
