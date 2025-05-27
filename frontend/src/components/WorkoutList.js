import React from 'react';
import WorkoutItem from './WorkoutItem';

const WorkoutList = ({ workouts, onDeleteWorkout, onEditWorkout }) => {
  if (workouts.length === 0) {
    return (
      <div className="empty-state">
        <p>No workouts recorded yet. Start by adding your first workout!</p>
      </div>
    );
  }

  // Group workouts by date
  const groupedWorkouts = workouts.reduce((groups, workout) => {
    const date = workout.workout_date.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(workout);
    return groups;
  }, {});

  return (
    <div className="workout-list">
      <h2>Your Workouts</h2>
      {Object.entries(groupedWorkouts).map(([date, dateWorkouts]) => (
        <div key={date}>
          <h3 style={{ marginTop: '20px', marginBottom: '10px', color: '#666' }}>
            {new Date(date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
          {dateWorkouts.map(workout => (
            <WorkoutItem
              key={workout.id}
              workout={workout}
              onDelete={onDeleteWorkout}
              onEdit={onEditWorkout}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default WorkoutList;