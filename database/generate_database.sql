-- The sql file used to automate the database generating for the app 

-- Use the SQL command below in postgress to make the databse to store the information if a database is not already present
-- It will create a database named nutrition_app
-- CREATE DATABASE nutrition_app;

-- This command is used to run this file to create the tables for database

-- psql -d nutrition_app -f generate_database.sql

-- SET search_path TO nutrition;


-- Create a schema to isolate this app's tables
CREATE SCHEMA IF NOT EXISTS nutrition;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- User table holds info about user like 
-- user_id, password, name, age, weight, height, gender, level of activity of user

CREATE TABLE nutrition.Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,  -- Store hashed password, never plain text
    password_salt VARCHAR(100) NOT NULL,  -- Store salt separately for added security
    full_name VARCHAR(100),
    age INT CHECK (age > 0 AND age < 120),
    height FLOAT CHECK (height > 0),      -- Presumably in cm or inches
    weight FLOAT CHECK (weight > 0),      -- Presumably in kg or pounds
    gender VARCHAR(20),
    activity_level VARCHAR(50) CHECK (activity_level IN ('sedentary', 'light', 'moderate', 'active', 'very active')),
    goal VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);


-- Table to store different excercises that can be performed by the user

CREATE TABLE nutrition.Exercises (
    exercise_id SERIAL PRIMARY KEY,
    exercise_name VARCHAR(150) UNIQUE NOT NULL,
    description TEXT,
    exercise_type VARCHAR(50),
    body_part VARCHAR(50),
    equipment VARCHAR(50),
    difficulty_level VARCHAR(50),
    rating NUMERIC(2,1),
    rating_description TEXT
);


-- Table for tracking the exercise activities of a user 

CREATE TABLE nutrition.Exercises_progress (
    performance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INT NOT NULL REFERENCES nutrition.Users(user_id) ON DELETE CASCADE,
    exercise_id INT NOT NULL REFERENCES nutrition.Exercises(exercise_id) ON DELETE CASCADE,
    performance_data DATE NOT NULL DEFAULT CURRENT_DATE,
    reps INT CHECK (reps >= 0),
    sets INT CHECK (sets >= 0),
    duration_mins FLOAT CHECK (duration_mins >= 0)
);


-- Table to store exercise routine created by users 

CREATE TABLE nutrition.Routine(
    routine_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INT NOT NULL REFERENCES nutrition.Users(user_id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE nutrition.Routine_days (
    routine_id UUID NOT NULL REFERENCES nutrition.Routine(routine_id) ON DELETE CASCADE,
    day_of_week VARCHAR(20) NOT NULL CHECK (day_of_week IN (
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    )),
    PRIMARY KEY (routine_id, day_of_week)
);


-- Cross reference table for execise in a routine 

CREATE TABLE nutrition.Exercises_in_routine (

    routine_id UUID NOT NULL REFERENCES nutrition.Routine(routine_id) ON DELETE CASCADE,
    exercise_id INT NOT NULL REFERENCES nutrition.Exercises(exercise_id) ON DELETE CASCADE,
    order_in_routine INT NOT NULL CHECK (order_in_routine > 0),  -- Order of performance
    sets INT NOT NULL CHECK (sets > 0),
    reps INT NOT NULL CHECK (reps > 0),
    rest_seconds INT CHECK (rest_seconds >= 0),
    PRIMARY KEY (routine_id, exercise_id)
);


-- Table to track the weight change of the user over time 

CREATE TABLE nutrition.Weight_Progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INT REFERENCES nutrition.Users(user_id) ON DELETE CASCADE,
    weight FLOAT CHECK (weight > 0),
    recorded_date DATE DEFAULT CURRENT_DATE
);

-- Keeps track of food information Foundations foods have the is_recipe set to false 

CREATE TABLE nutrition.Food (
    food_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    calories FLOAT CHECK (calories >= 0),
    is_recipe BOOLEAN DEFAULT FALSE
);

-- Keeps track of the nutrition information of a food_item 

CREATE TABLE nutrition.Food_Nutrition_Macro (
    food_id INT PRIMARY KEY REFERENCES nutrition.Food(food_id) ON DELETE CASCADE,
    protein FLOAT CHECK (protein >= 0),
    carbs FLOAT CHECK (carbs >= 0),
    fat FLOAT CHECK (fat >= 0),
    fiber FLOAT CHECK (fiber >= 0)
);

-- micro nutritions 




-- keeps track of food recepies both user created and ones we create 

CREATE TABLE nutrition.Recipes (
    recipe_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES nutrition.Users(user_id)  ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Keeps track of what ingreadent each recepies contain 

CREATE TABLE nutrition.Recipe_Ingredients (
    id SERIAL PRIMARY KEY,
    recipe_id INT REFERENCES nutrition.Recipes(recipe_id) ON DELETE CASCADE,
    ingredient_food_id INT REFERENCES nutrition.Food(food_id) ON DELETE CASCADE,
    quantity FLOAT CHECK (quantity > 0), -- e.g., grams or mL
    unit VARCHAR(20) -- optional: grams, cups, tbsp, etc.
);


-- Cross reference table for recepies and the food they contain 

CREATE TABLE nutrition.Recipe_Food_Link (
    recipe_id INT REFERENCES nutrition.Recipes(recipe_id) ON DELETE CASCADE,
    food_id INT REFERENCES nutrition.Food(food_id) ON DELETE CASCADE,
    PRIMARY KEY (recipe_id, food_id)
);


-- Table to track the food consumption of a user 

CREATE TABLE nutrition.Food_Intake (
    intake_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES nutrition.Users(user_id) ON DELETE CASCADE,
    food_id INT REFERENCES nutrition.Food(food_id) ON DELETE CASCADE,
    consumption_date DATE DEFAULT CURRENT_DATE,
    quantity FLOAT CHECK (quantity > 0) -- in grams or a standardized unit
);

-- daily progress 

CREATE TABLE nutrition.Daily_Progress (
    progress_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INT REFERENCES nutrition.Users(user_id) ON DELETE CASCADE,
    progress_date DATE DEFAULT CURRENT_DATE,
    total_calories_consumed FLOAT CHECK (total_calories_consumed >= 0),
    total_calories_burned FLOAT CHECK (total_calories_burned >= 0)
);
