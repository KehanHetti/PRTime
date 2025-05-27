const db = require('../config/database');

class Workout {
  static async findAll() {
    const [rows] = await db.query(
      'SELECT * FROM workouts ORDER BY workout_date DESC, created_at DESC'
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM workouts WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(workoutData) {
    const { exercise_name, sets, reps, weight, duration, notes, workout_date } = workoutData;
    const [result] = await db.query(
      'INSERT INTO workouts (exercise_name, sets, reps, weight, duration, notes, workout_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [exercise_name, sets, reps, weight, duration, notes, workout_date]
    );
    return result.insertId;
  }

  static async update(id, workoutData) {
    const { exercise_name, sets, reps, weight, duration, notes, workout_date } = workoutData;
    const [result] = await db.query(
      'UPDATE workouts SET exercise_name = ?, sets = ?, reps = ?, weight = ?, duration = ?, notes = ?, workout_date = ? WHERE id = ?',
      [exercise_name, sets, reps, weight, duration, notes, workout_date, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM workouts WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getStatistics() {
    const [totalWorkouts] = await db.query('SELECT COUNT(*) as count FROM workouts');
    const [exerciseStats] = await db.query(
      'SELECT exercise_name, COUNT(*) as count, SUM(sets * reps) as total_reps FROM workouts GROUP BY exercise_name ORDER BY count DESC'
    );
    const [recentWorkouts] = await db.query(
      'SELECT * FROM workouts ORDER BY workout_date DESC LIMIT 5'
    );
    
    return {
      totalWorkouts: totalWorkouts[0].count,
      exerciseStats,
      recentWorkouts
    };
  }
}

module.exports = Workout;