import React, { useState } from 'react';
import './auth.css';
import { motion } from 'framer-motion';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="auth-card">
        <motion.h2
          className="auth-title"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {isLogin ? 'Welcome Back 👋' : 'Create Account'}
        </motion.h2>

        <form className="auth-form">
          {!isLogin && (
            <input type="text" placeholder="Full Name" required />
          )}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">
            {isLogin ? 'Login 🚀' : 'Sign Up ✨'}
          </button>
        </form>

        <p className="auth-toggle">
          {isLogin ? "Don't have an account?" : 'Already a member?'}{' '}
          <span onClick={toggleMode}>{isLogin ? 'Sign Up' : 'Login'}</span>
        </p>
      </div>
    </motion.div>
  );
};

export default Auth;
