import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Canteen.css';
import axios from 'axios';

const Canteen = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [foodOutput, setFoodOutput] = useState('');

  const [formData, setFormData] = useState({
    season: '',
    day_of_week: '',
    is_holiday: 'No',
    special_event: 'No',
    menu_type: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFoodSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/canteen/predict-demand', formData);
      setFoodOutput(`Predicted demand: ${response.data.predicted_meal_demand} meals for today based on inputs.`);
    } catch (error) {
      console.error('Prediction error:', error);
      setFoodOutput('Error predicting food demand. Please try again.');
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

      <div className={`canteen-grid ${expandedCard ? 'expanded-view' : ''}`}>
        {/* Food Demand Prediction */}
        {expandedCard === null || expandedCard === 'food' ? (
          <motion.div
            className={`canteen-card ${expandedCard === 'food' ? 'expanded' : ''}`}
            onClick={() => !expandedCard && setExpandedCard('food')}
            layout
            initial={{ borderRadius: 15 }}
            transition={{ layout: { duration: 0.4, ease: 'easeInOut' } }}
          >
            <div className="card-header">
              <h3>📊 Food Demand Prediction</h3>
              {expandedCard === 'food' && (
                <button
                  className="close-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCard(null);
                    setFoodOutput('');
                  }}
                >
                  ❌
                </button>
              )}
            </div>

            {expandedCard !== 'food' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                AI predicts daily meal demand based on student attendance, previous consumption data, and seasonal trends.
              </motion.p>
            )}

            {expandedCard === 'food' && (
              <>
                <motion.div
                  className="form-section"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <label>
                    Season:
                    <input type="text" placeholder="e.g. Summer" />
                  </label>
                  <label>
                    Day:
                    <input type="text" placeholder="e.g. Monday" />
                  </label>
                  <label>
                    Holiday:
                    <select>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </label>
                  <label>
                    Special Day:
                    <select>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </label>
                  <label>
                    Meal Type:
                    <select>
                      <option value="veg">Veg</option>
                      <option value="non-veg">Non-Veg</option>
                      <option value="special">Special</option>
                    </select>
                  </label>

                  <button className="submit-btn" onClick={handleFoodSubmit}>
                    Submit
                  </button>
                </motion.div>

                {foodOutput && <div className="output-box">{foodOutput}</div>}
              </>
            )}
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default Canteen;
