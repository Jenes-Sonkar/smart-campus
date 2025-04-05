import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './canteen.css';

const Canteen = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  // Individual output states
  const [foodOutput, setFoodOutput] = useState('');
  const [nutritionOutput, setNutritionOutput] = useState('');

  // Mock Submit Handlers (replace with actual ML integration later)
  const handleFoodSubmit = () => {
    setFoodOutput('Predicted demand: 420 meals for today based on inputs.');
  };

  const handleNutritionSubmit = () => {
    setNutritionOutput('Suggested Meal Plan: High Protein Diet (2300 kcal/day)');
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

        {/* Nutritious Suggestions */}
        {expandedCard === null || expandedCard === 'nutrition' ? (
          <motion.div
            className={`canteen-card ${expandedCard === 'nutrition' ? 'expanded' : ''}`}
            onClick={() => !expandedCard && setExpandedCard('nutrition')}
            layout
            initial={{ borderRadius: 15 }}
            transition={{ layout: { duration: 0.4, ease: 'easeInOut' } }}
          >
            <div className="card-header">
              <h3>🥗 Nutritious Suggestions</h3>
              {expandedCard === 'nutrition' && (
                <button
                  className="close-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCard(null);
                    setNutritionOutput('');
                  }}
                >
                  ❌
                </button>
              )}
            </div>

            {expandedCard !== 'nutrition' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Get meal suggestions based on your health profile and nutritional goals. AI recommends balanced diet options.
              </motion.p>
            )}

            {expandedCard === 'nutrition' && (
              <>
                <motion.div
                  className="form-section"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <label>
                    Gender:
                    <select>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                  <label>
                    Weight (kg):
                    <input type="number" placeholder="e.g. 65" />
                  </label>
                  <label>
                    Height (cm):
                    <input type="number" placeholder="e.g. 170" />
                  </label>
                  <label>
                    Activity Level:
                    <select>
                      <option value="">Select</option>
                      <option value="low">Low</option>
                      <option value="moderate">Moderate</option>
                      <option value="high">High</option>
                    </select>
                  </label>
                  <label>
                    Dietary Preference:
                    <select>
                      <option value="">Select</option>
                      <option value="veg">Vegetarian</option>
                      <option value="non-veg">Non-Vegetarian</option>
                    </select>
                  </label>
                  <label>
                    Meals per day:
                    <input type="number" placeholder="e.g. 3" />
                  </label>

                  <button className="submit-btn" onClick={handleNutritionSubmit}>
                    Submit
                  </button>
                </motion.div>

                {nutritionOutput && <div className="output-box">{nutritionOutput}</div>}
              </>
            )}
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default Canteen;
