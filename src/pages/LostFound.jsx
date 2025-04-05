import React from 'react';
import { motion } from 'framer-motion';
import './lostfound.css';

const LostFound = () => {
  return (
    <motion.div
      className="lostfound-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="section-title">📍 Digital Lost & Found System</h2>
      <p className="section-description">
        A connected platform to track and report lost items efficiently with location awareness and community support.
      </p>

      <div className="lostfound-grid">
        <div className="lostfound-card">
          <h3>📌 Report Lost Item</h3>
          <p>Easily create a report for any item you've lost, including time, location, and item description.</p>
        </div>

        <div className="lostfound-card">
          <h3>🧭 Track Found Items</h3>
          <p>Browse through recently found items posted by other students or staff in real-time.</p>
        </div>

        
      </div>
    </motion.div>
  );
};

export default LostFound;