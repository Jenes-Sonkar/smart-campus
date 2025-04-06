import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Auth.css";

const Auth = ({ setShowLogin, setIsLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleMode = () => setIsLogin(!isLogin);

  const closeForm = () => {
    setShowLogin(false);
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
    };

    const url = isLogin
      ? "http://localhost:5000/login"
      : "http://localhost:5000/register";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        localStorage.setItem("token", responseData.token);
        setIsLoggedIn(true); 
        setShowLogin(false);
        navigate("/");
      } else {
        alert(responseData?.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="auth-card"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close button */}
        <motion.button
          className="auth-close-btn"
          onClick={closeForm}
          whileHover={{ scale: 1.2, rotate: 90 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          ✕
        </motion.button>

        <motion.h2
          className="auth-title"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {isLogin ? "Welcome Back " : "Create Account"}
        </motion.h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="auth-input"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="auth-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="auth-input"
          />
          <button type="submit" className="auth-button">
            {isLogin ? "Login " : "Sign Up "}
          </button>
        </form>

        <p className="auth-toggle">
          {isLogin ? "Don't have an account?" : "Already a member?"}{" "}
          <span onClick={toggleMode}>{isLogin ? "Sign Up" : "Login"}</span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Auth;
