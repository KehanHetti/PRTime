import React, { useState, useEffect } from 'react';
import WorkoutForm from './components/WorkoutForm';
import WorkoutList from './components/WorkoutList';
import Statistics from './components/Statistics';
import { getWorkouts, deleteWorkout, getStatistics } from './services/api';
import './App.css';

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingWorkout, setEditingWorkout] = useState(null);

  useEffect(() => {
    fetchWorkouts();
    fetchStatistics();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const data = await getStatistics();
      setStatistics(data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const handleWorkoutAdded = () => {
    fetchWorkouts();
    fetchStatistics();
    setEditingWorkout(null);
  };

  const handleDeleteWorkout = async (id) => {
    try {
      await deleteWorkout(id);
      fetchWorkouts();
      fetchStatistics();
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  const handleEditWorkout = (workout) => {
    setEditingWorkout(workout);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>💪 Daily Workout Tracker</h1>
      </header>
      
      <main className="App-main">
        <div className="container">
          <div className="left-panel">
            <WorkoutForm 
              onWorkoutAdded={handleWorkoutAdded} 
              editingWorkout={editingWorkout}
              onCancelEdit={() => setEditingWorkout(null)}
            />
            {statistics && <Statistics statistics={statistics} />}
          </div>
          
          <div className="right-panel">
            {loading ? (
              <p>Loading workouts...</p>
            ) : (
              <WorkoutList 
                workouts={workouts} 
                onDeleteWorkout={handleDeleteWorkout}
                onEditWorkout={handleEditWorkout}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;