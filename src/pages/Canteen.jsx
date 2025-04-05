import React from 'react';
import { motion } from 'framer-motion';
import './canteen.css';

const Canteen = () => {
  return (
    <motion.div
      className="canteen-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="section-title">AI-Powered Canteen & Mess Management</h2>
      <p className="section-description">
        Revolutionizing food services on campus with smart automation and AI to improve efficiency and reduce food wastage.
      </p>

      <div className="canteen-grid">
        <div className="canteen-card">
          <h3>📊 Food Demand Prediction</h3>
          <p>AI predicts daily meal demand based on student attendance, previous consumption data, and seasonal trends.</p>
        </div>

        <div className="canteen-card">
          <h3>🥗 Nutritious Suggestions</h3>
          <p>Get meal suggestions based on your health profile and nutritional goals. AI recommends balanced diet options.</p>
        </div>

       
      </div>
    </motion.div>
  );
};

export default Canteen;
