import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Scholarships.css';
import axios from 'axios';

const Scholarships = () => {
  const [expanded, setExpanded] = useState(false);
  const [output, setOutput] = useState('');
  const [form, setForm] = useState({
    name: '',
    GPA: '',
    Extracurriculars: '',
    FamilyIncome: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: form.name,
        GPA: parseFloat(form.GPA),
        Extracurriculars: parseInt(form.Extracurriculars),
        FamilyIncome: parseFloat(form.FamilyIncome)
      };

      const res = await axios.post('http://localhost:5000/scholarship/predict', payload);

      if (res.data.eligible) {
        setOutput('🎉 You are eligible for the XYZ Merit Scholarship!');
      } else {
        setOutput('😞 Sorry, you are not eligible for the scholarship.');
      }
    } catch (err) {
      console.error(err);
      setOutput('❌ An error occurred. Please try again.');
    }
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
            <motion.form
              className="form-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
            >
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </label>
              <label>
                GPA:
                <input
                  type="number"
                  name="GPA"
                  step="0.01"
                  value={form.GPA}
                  onChange={handleChange}
                  placeholder="e.g. 3.8"
                  required
                />
              </label>
              <label>
                Upload Academic Certificate:
                <input type="file" disabled />
              </label>
              <label>
                Extracurricular (count):
                <input
                  type="number"
                  name="Extracurriculars"
                  value={form.Extracurriculars}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  required
                />
              </label>
              <label>
                Family Income (INR/year):
                <input
                  type="number"
                  name="FamilyIncome"
                  value={form.FamilyIncome}
                  onChange={handleChange}
                  placeholder="e.g. 200000"
                  required
                />
              </label>
              <button className="submit-btn" type="submit">Submit</button>

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
            </motion.form>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Scholarships;
