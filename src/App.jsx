import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Canteen from './pages/Canteen';
import LostFound from './pages/LostFound';
import Scholarships from './pages/Scholarships';
import './App.css';
import Auth from './pages/Auth/Auth';

const App = () => {
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setShowLogin(false);
    }
  }, []);

  return (
    <Router>
      <Navbar />
      
      {/* Auth Popup */}
      {showLogin && <Auth setShowLogin={setShowLogin} />}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/canteen" element={<Canteen />} />
        <Route path="/lostfound" element={<LostFound />} />
        <Route path="/scholarships" element={<Scholarships />} />
      </Routes>
    </Router>
  );
};

export default App;
