import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Home.css';

const features = [
  { title: 'Smart Canteen', desc: 'Order food online from campus canteen.', path: '/canteen' },
  { title: 'Lost & Found', desc: 'Report and claim lost items easily.', path: '/lost-found' },
  { title: 'Scholarships', desc: 'Get real-time updates on available scholarships.', path: '/scholarships' }
];

const Home = () => {
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="home-title"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Smart Campus Solutions
      </motion.h1>

      <motion.p
        className="home-subtitle"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
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
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {features.map((feature, idx) => (
          <Link
            to={feature.path}
            key={idx}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <motion.div
              className="feature-card"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Home;
