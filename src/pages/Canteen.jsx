import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './canteen.css';

const Canteen = () => {
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState({
    season: '',
    day: '',
    holiday: 'no',
    specialDay: 'no',
    mealType: 'veg',
  });
  const [predictedDemand, setPredictedDemand] = useState('');
  const [loading, setLoading] = useState(false); // Added

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = async () => {
    setLoading(true);
    setPredictedDemand('');
    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setPredictedDemand(data.meal_demand);
    } catch (error) {
      console.error('Error sending data:', error);
      setPredictedDemand('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

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

      <div className={`canteen-grid ${expanded ? 'expanded-view' : ''}`}>
        <motion.div
          className={`canteen-card ${expanded ? 'expanded' : ''}`}
          onClick={() => !expanded && setExpanded(true)}
          layout
          initial={{ borderRadius: 15 }}
          transition={{ layout: { duration: 0.4, ease: 'easeInOut' } }}
        >
          <div className="card-header">
  <h3>📊 Food Demand Prediction</h3>
  {expanded && (
    <button
      className="close-btn"
      onClick={(e) => {
        e.stopPropagation();
        setExpanded(false);
        setPredictedDemand('');
      }}
    >
      ❌
    </button>
  )}
</div>

          {!expanded && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              AI predicts daily meal demand based on student attendance, previous consumption data, and seasonal trends.
            </motion.p>
          )}

          {expanded && (
            <motion.div
              className="form-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <label>
                Season:
                <input
                  type="text"
                  name="season"
                  value={formData.season}
                  onChange={handleChange}
                  placeholder="e.g. Summer"
                />
              </label>
              <label>
                Day:
                <input
                  type="text"
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  placeholder="e.g. Monday"
                />
              </label>
              <label>
                Holiday:
                <select name="holiday" value={formData.holiday} onChange={handleChange}>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </label>
              <label>
                Special Day:
                <select name="specialDay" value={formData.specialDay} onChange={handleChange}>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </label>
              <label>
                Meal Type:
                <select name="mealType" value={formData.mealType} onChange={handleChange}>
                  <option value="veg">Veg</option>
                  <option value="non-veg">Non-Veg</option>
                  <option value="special">Special</option>
                </select>
              </label>

              <button className="send-btn" onClick={handleSend}>Send</button>

              {loading && <div className="spinner"></div>}

              {predictedDemand && (
                <div className="output-pane">
                  <label>Predicted Meal Demand:</label>
                  <textarea
                    className="prediction-output"
                    value={predictedDemand}
                    readOnly
                    rows={3}
                  />
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        {!expanded && (
          <motion.div
            className="canteen-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3>🥗 Nutritious Suggestions</h3>
            <p>
              Get meal suggestions based on your health profile and nutritional goals. AI recommends balanced diet options.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Canteen;
