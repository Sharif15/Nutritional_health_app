-- The sql file used to automate the database generating for the app 

-- User table holds info about user like 
-- user_id, password, name, age, weight, height, gender, level of activity of user

CREATE TABLE Users (
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

CREATE TABLE Excercises (
    excercise_id SERIAL PRIMARY KEY,
    excercise_name VARCHAR(100) UNIQUE NOT NULL,
);

-- Table for tracking the excercise activities of a user 

CREATE TABLE Excercises_progress (
    performance_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES(Users),
    excercise_id INT REFERENCES(Excercises),
    performance_data DATE DEFAULT CURRENT_DATE,
    reps INT,
    sets INT,
    duration_mins FLOAT
);

-- Table to track the weight change of the user over time 

CREATE TABLE Weight_Progress (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    weight FLOAT,
    recorded_date DATE DEFAULT CURRENT_DATE
);

-- Table to track the food consumption of a user 

CREATE TABLE Food_Intake (
    intake_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    food_id INT REFERENCES Food(food_id),
    consumption_date DATE,
    quantity FLOAT  -- in grams or a standardized unit
);

-- Keeps track of food information Foundations foods have the is_recipe set to false 

CREATE TABLE Food (
    food_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    calories FLOAT,
    is_recipe BOOLEAN DEFAULT FALSE
);

-- Keeps track of the nutrition information of a food_item 

CREATE TABLE Food_Nutrition_Macro (
    food_id INT PRIMARY KEY REFERENCES Food(food_id),
    protein FLOAT,
    carbs FLOAT,
    fat FLOAT,
    fiber FLOAT
);


-- keeps track of food recepies both user created and ones we create 

CREATE TABLE Recipes (
    recipe_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    name VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Keeps track of what ingreadent each recepies contain 

CREATE TABLE Recipe_Ingredients (
    id SERIAL PRIMARY KEY,
    recipe_id INT REFERENCES Recipes(recipe_id),
    ingredient_food_id INT REFERENCES Food(food_id),
    quantity FLOAT, -- e.g., grams or mL
    unit VARCHAR(20) -- optional: grams, cups, tbsp, etc.
);


-- Cross reference table for recepies and the food they contain 

CREATE TABLE Recipe_Food_Link (
    recipe_id INT REFERENCES Recipes(recipe_id),
    food_id INT REFERENCES Food(food_id),
    PRIMARY KEY (recipe_id, food_id)
);


