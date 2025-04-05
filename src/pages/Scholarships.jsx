import React from 'react';
import { motion } from 'framer-motion';
import './scholarships.css';

const Scholarships = () => {
  return (
    <motion.div
      className="scholarships-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="section-title">🎓 Automated Scholarship Finder</h2>
      <p className="section-description">
        A centralized hub for all scholarship opportunities tailored to student profiles with real-time notifications.
      </p>

      <div className="scholarships-grid">
        <div className="scholarships-card">
          <h3>🏛️ Government Scholarships</h3>
          <p>Discover scholarships offered by central and state governments with eligibility details and deadlines.</p>
        </div>

        <div className="scholarships-card">
          <h3>🏢 Private Organization Grants</h3>
          <p>Find grants and awards from NGOs, companies, and foundations relevant to your academic background.</p>
        </div>

        <div className="scholarships-card">
          <h3>🤖 Auto Match AI</h3>
          <p>Our AI engine automatically matches you with the most relevant scholarships and alerts you via email.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Scholarships;
