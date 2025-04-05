import React from 'react';
import { motion } from 'framer-motion';
import './Home.css';

const features = [
  { title: 'Smart Canteen', desc: 'Order food online from campus canteen.' },
  { title: 'Lost & Found', desc: 'Report and claim lost items easily.' },
  { title: 'Scholarships', desc: 'Get real-time updates on available scholarships.' }
];

const Home = () => {
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="home-title"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Smart Campus Solutions 
      </motion.h1>

      <motion.p
        className="home-subtitle"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Empowering students with AI-driven campus innovations.
      </motion.p>

      <motion.div
        className="feature-container"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
      >
        {features.map((item, index) => (
          <motion.div
            key={index}
            className="feature-card"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Home;
