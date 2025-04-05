import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './lostfound.css';

const LostFound = () => {
  const [showReportForm, setShowReportForm] = useState(false);
  const [showTrackForm, setShowTrackForm] = useState(false);

  // Lost item report state
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [hostelAddress, setHostelAddress] = useState('');
  const [contact, setContact] = useState('');

  // Found item report state
  const [foundImage, setFoundImage] = useState(null);
  const [foundLocation, setFoundLocation] = useState('');
  const [foundName, setFoundName] = useState('');
  const [foundRollNo, setFoundRollNo] = useState('');
  const [foundContact, setFoundContact] = useState('');

  const handleLostImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFoundImageChange = (e) => {
    setFoundImage(e.target.files[0]);
  };

  const handleSubmitLost = (e) => {
    e.preventDefault();
    alert('Lost item reported successfully!');
    setImage(null);
    setDescription('');
    setName('');
    setBranch('');
    setRollNo('');
    setHostelAddress('');
    setContact('');
    setShowReportForm(false);
  };

  const handleSubmitFound = (e) => {
    e.preventDefault();
    alert('Found item submitted successfully!');
    setFoundImage(null);
    setFoundLocation('');
    setFoundName('');
    setFoundRollNo('');
    setFoundContact('');
    setShowTrackForm(false);
  };

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

      <div className={`lostfound-grid ${(showReportForm || showTrackForm) ? 'expanded' : ''}`}>
        {/* Report Lost Item */}
        {!showTrackForm && (
          <motion.div
            className={`lostfound-card report-card ${showReportForm ? 'active' : ''}`}
            onClick={() => setShowReportForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <h3>📌 Report Lost Item</h3>
            <p>Easily create a report for any item you've lost, including time, location, and item description.</p>

            <AnimatePresence>
              {showReportForm && (
                <motion.form
                  className="lostfound-form"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  onSubmit={handleSubmitLost}
                >
                  <button type="button" className="close-btn" onClick={() => setShowReportForm(false)}>✖</button>

                  <label>Name:</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                  <label>Branch:</label>
                  <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} required />

                  <label>Roll No:</label>
                  <input type="text" value={rollNo} onChange={(e) => setRollNo(e.target.value)} required />

                  <label>Hostel Address:</label>
                  <input type="text" value={hostelAddress} onChange={(e) => setHostelAddress(e.target.value)} required />

                  <label>Contact Number:</label>
                  <input type="tel" value={contact} onChange={(e) => setContact(e.target.value)} required />

                  <label>Upload Image:</label>
                  <input type="file" accept=".jpg,.jpeg,.png" onChange={handleLostImageChange} required />

                  <label>Item Description:</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    placeholder="Describe the item, when and where you lost it..."
                    required
                  ></textarea>

                  <div className="form-buttons">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={() => setShowReportForm(false)}>Cancel</button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Track Found Items */}
        {!showReportForm && (
          <motion.div
            className={`lostfound-card track-card ${showTrackForm ? 'active' : ''}`}
            onClick={() => setShowTrackForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <h3>🧭 Track Found Items</h3>
            <p>Upload details about any found item to help its rightful owner reclaim it.</p>

            <AnimatePresence>
              {showTrackForm && (
                <motion.form
                  className="lostfound-form"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                  onClick={(e) => e.stopPropagation()}
                  onSubmit={handleSubmitFound}
                >
                  <button type="button" className="close-btn" onClick={() => setShowTrackForm(false)}>✖</button>

                  <label>Name:</label>
                  <input type="text" value={foundName} onChange={(e) => setFoundName(e.target.value)} required />

                  <label>Roll No:</label>
                  <input type="text" value={foundRollNo} onChange={(e) => setFoundRollNo(e.target.value)} required />
                  <label>Branch:</label>
                  <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} required />

                  <label>Contact Number:</label>
                  <input type="tel" value={foundContact} onChange={(e) => setFoundContact(e.target.value)} required />

                  <label>Upload Image of Found Item:</label>
                  <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFoundImageChange} required />

                  <label>Location Found:</label>
                  <input
                    type="text"
                    value={foundLocation}
                    onChange={(e) => setFoundLocation(e.target.value)}
                    placeholder="Where did you find it?"
                    required
                  />

                  <div className="form-buttons">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={() => setShowTrackForm(false)}>Cancel</button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default LostFound;
