import React from 'react';

const Statistics = ({ statistics }) => {
  if (!statistics) return null;

  return (
    <div className="statistics">
      <h3>📊 Your Statistics</h3>
      
      <div className="stat-item">
        <div className="stat-label">Total Workouts</div>
        <div className="stat-value">{statistics.totalWorkouts}</div>
      </div>
      
      {statistics.exerciseStats.length > 0 && (
        <div className="exercise-stats">
          <h4>Top Exercises</h4>
          {statistics.exerciseStats.slice(0, 5).map((stat, index) => (
            <div key={index} className="exercise-stat">
              <span>{stat.exercise_name}</span>
              <span>{stat.count} times</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Statistics;