import React from 'react';

const WorkoutItem = ({ workout, onDelete, onEdit }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="workout-item">
      <div className="workout-header">
        <h3 className="workout-title">{workout.exercise_name}</h3>
        <span className="workout-date">{formatDate(workout.workout_date)}</span>
      </div>
      
      <div className="workout-details">
        <div className="detail-item">
          <span className="detail-label">Sets</span>
          <span className="detail-value">{workout.sets}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Reps</span>
          <span className="detail-value">{workout.reps}</span>
        </div>
        {workout.weight && (
          <div className="detail-item">
            <span className="detail-label">Weight</span>
            <span className="detail-value">{workout.weight} kg</span>
          </div>
        )}
        {workout.duration && (
          <div className="detail-item">
            <span className="detail-label">Duration</span>
            <span className="detail-value">{workout.duration} min</span>
          </div>
        )}
      </div>
      
      {workout.notes && (
        <div className="workout-notes">
          <strong>Notes:</strong> {workout.notes}
        </div>
      )}
      
      <div className="workout-actions">
        <button className="btn btn-secondary" onClick={() => onEdit(workout)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(workout.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default WorkoutItem;