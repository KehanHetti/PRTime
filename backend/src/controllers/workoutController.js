const Workout = require('../models/Workout');
const { validationResult } = require('express-validator');

const workoutController = {
  async getAllWorkouts(req, res) {
    try {
      const workouts = await Workout.findAll();
      res.json(workouts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getWorkoutById(req, res) {
    try {
      const workout = await Workout.findById(req.params.id);
      if (!workout) {
        return res.status(404).json({ error: 'Workout not found' });
      }
      res.json(workout);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createWorkout(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const workoutId = await Workout.create(req.body);
      const newWorkout = await Workout.findById(workoutId);
      res.status(201).json(newWorkout);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateWorkout(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const success = await Workout.update(req.params.id, req.body);
      if (!success) {
        return res.status(404).json({ error: 'Workout not found' });
      }
      const updatedWorkout = await Workout.findById(req.params.id);
      res.json(updatedWorkout);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteWorkout(req, res) {
    try {
      const success = await Workout.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Workout not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getStatistics(req, res) {
    try {
      const stats = await Workout.getStatistics();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = workoutController;