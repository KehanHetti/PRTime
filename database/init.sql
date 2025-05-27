CREATE DATABASE IF NOT EXISTS workout_tracker;
USE workout_tracker;

CREATE TABLE IF NOT EXISTS workouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exercise_name VARCHAR(255) NOT NULL,
    sets INT NOT NULL,
    reps INT NOT NULL,
    weight DECIMAL(5,2),
    duration INT,
    notes TEXT,
    workout_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exercise_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO exercise_types (name, category) VALUES
    ('Bench Press', 'Chest'),
    ('Squat', 'Legs'),
    ('Deadlift', 'Back'),
    ('Overhead Press', 'Shoulders'),
    ('Pull-ups', 'Back'),
    ('Push-ups', 'Chest'),
    ('Running', 'Cardio'),
    ('Cycling', 'Cardio');