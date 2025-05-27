const express = require('express');
const { body } = require('express-validator');
const workoutController = require('../controllers/workoutController');

const router = express.Router();

// Validation middleware
const workoutValidation = [
  body('exercise_name').notEmpty().withMessage('Exercise name is required'),
  body('sets').isInt({ min: 1 }).withMessage('Sets must be a positive integer'),
  body('reps').isInt({ min: 0 }).withMessage('Reps must be a non-negative integer'),
  body('weight').optional().isFloat({ min: 0 }).withMessage('Weight must be a positive number'),
  body('duration').optional().isInt({ min: 0 }).withMessage('Duration must be a non-negative integer'),
  body('workout_date').isISO8601().withMessage('Valid date is required')
];

// Routes
router.get('/', workoutController.getAllWorkouts);
router.get('/statistics', workoutController.getStatistics);
router.get('/:id', workoutController.getWorkoutById);
router.post('/', workoutValidation, workoutController.createWorkout);
router.put('/:id', workoutValidation, workoutController.updateWorkout);
router.delete('/:id', workoutController.deleteWorkout);

module.exports = router;