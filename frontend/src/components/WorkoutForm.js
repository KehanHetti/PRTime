import React, { useState, useEffect } from 'react';
import { createWorkout, updateWorkout } from '../services/api';

const WorkoutForm = ({ onWorkoutAdded, editingWorkout, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    exercise_name: '',
    sets: '',
    reps: '',
    weight: '',
    duration: '',
    notes: '',
    workout_date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (editingWorkout) {
      setFormData({
        ...editingWorkout,
        workout_date: editingWorkout.workout_date.split('T')[0]
      });
    }
  }, [editingWorkout]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingWorkout) {
        await updateWorkout(editingWorkout.id, formData);
      } else {
        await createWorkout(formData);
      }
      setFormData({
        exercise_name: '',
        sets: '',
        reps: '',
        weight: '',
        duration: '',
        notes: '',
        workout_date: new Date().toISOString().split('T')[0]
      });
      onWorkoutAdded();
    } catch (error) {
      console.error('Error saving workout:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      exercise_name: '',
      sets: '',
      reps: '',
      weight: '',
      duration: '',
      notes: '',
      workout_date: new Date().toISOString().split('T')[0]
    });
    onCancelEdit();
  };

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <h2>{editingWorkout ? 'Edit Workout' : 'Add New Workout'}</h2>
      
      <div className="form-group">
        <label htmlFor="exercise_name">Exercise Name</label>
        <input
          type="text"
          id="exercise_name"
          name="exercise_name"
          value={formData.exercise_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="sets">Sets</label>
          <input
            type="number"
            id="sets"
            name="sets"
            value={formData.sets}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reps">Reps</label>
          <input
            type="number"
            id="reps"
            name="reps"
            value={formData.reps}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            min="0"
            step="0.5"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="duration">Duration (minutes)</label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          min="0"
        />
      </div>

      <div className="form-group">
        <label htmlFor="workout_date">Date</label>
        <input
          type="date"
          id="workout_date"
          name="workout_date"
          value={formData.workout_date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingWorkout ? 'Update Workout' : 'Add Workout'}
        </button>
        {editingWorkout && (
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default WorkoutForm;