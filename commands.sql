-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS canteen_db;

USE canteen_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(128) NOT NULL
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create meals table
CREATE TABLE IF NOT EXISTS meals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_healthy BOOLEAN DEFAULT FALSE
);
CREATE TABLE IF NOT EXISTS eligible_students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    cgpa FLOAT,
    extracurricular BOOLEAN,
    family_income FLOAT
);
