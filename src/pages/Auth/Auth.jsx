import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { motion } from "framer-motion";

const Auth = ({ setShowLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Function to toggle between login and signup mode
  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  // Function to handle closing the login/signup form
  const closeForm = () => {
    setShowLogin(false); // Close the form
    navigate("/"); // Redirect to homepage
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
    };

    const url = isLogin ? "/api/login" : "/api/register";

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
        setShowLogin(false); // Close the form on successful login/signup
        navigate("/"); // Redirect to homepage after successful login/signup
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
      <div className="auth-card">
        {/* Close button in the top-right corner */}
        <button
          className="auth-close-btn"
          onClick={closeForm}
        >
          ✕
        </button>

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
      </div>
    </motion.div>
  );
};

export default Auth;
