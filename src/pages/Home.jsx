import React from 'react';
import { motion } from 'framer-motion';
import  './Home.css'
const Home = () => {
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1>Smart Campus Solutions</h1>
      <p>Empowering students with AI-driven campus innovations.</p>
    </motion.div>
  );
};

export default Home;