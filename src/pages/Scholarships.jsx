// scholarship.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './scholarships.css';

const Scholarships = () => {
  const [expanded, setExpanded] = useState(false);
  const [output, setOutput] = useState('');

  const handleSubmit = (e) => {
    e.stopPropagation();
    setOutput('🎉 You are eligible for the XYZ Merit Scholarship!');
  };

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

      <div className="scholarship-box-wrapper">
        <motion.div
          className={`scholarship-box ${expanded ? 'expanded' : ''}`}
          onClick={() => !expanded && setExpanded(true)}
          layout
          transition={{ layout: { duration: 0.5, ease: 'easeInOut' } }}
        >
          <div className="box-header">
            {!expanded && (
              <h3 className="box-title">Tap to find scholarship 🎓</h3>
            )}
            {expanded && (
              <>
                <h3 className="box-title">Enter your details:</h3>
                <button
                  className="close-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(false);
                    setOutput('');
                  }}
                >
                  ❌
                </button>
              </>
            )}
          </div>

          {expanded && (
            <motion.div
              className="form-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label>
                Name:
                <input type="text" placeholder="Enter your name" />
              </label>
              <label>
                GPA:
                <input type="text" placeholder="e.g. 3.8" />
              </label>
              <label>
                Upload Academic Certificate:
                <input type="file" />
              </label>
              <label>
                Extracurricular:
                <input type="text" placeholder="e.g. Debate, Sports, etc." />
              </label>
              <label>
                Family Income:
                <input type="text" placeholder="e.g. 2,00,000 INR/year" />
              </label>
              <button className="submit-btn" onClick={handleSubmit}>
                Submit
              </button>

              {output && (
                <motion.div
                  className="output-box"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {output}
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Scholarships;
