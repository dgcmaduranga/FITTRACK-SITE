import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [goal, setGoal] = useState(0);

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!currentUser) return;
      const q = query(collection(db, 'workouts'), where('userId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setWorkouts(data);
    };

    fetchWorkouts();
  }, [currentUser]);

  const totalCalories = workouts.reduce((sum, w) => sum + Number(w.calories || 0), 0);

  const workoutData = workouts.map((w) => ({
    date: w.date?.seconds
      ? new Date(w.date.seconds * 1000).toLocaleDateString()
      : new Date(w.date).toLocaleDateString(),
    duration: w.duration,
  }));

  return (
    <div className="container py-4">
      <div className="alert alert-success text-center">
        Logged in as: <strong>{currentUser?.email}</strong>
      </div>

      <h2 className="text-center mb-4">Welcome to Your Dashboard 💪</h2>

      <div className="row text-center mb-4">
        <div className="col-md-6">
          <div className="card bg-dark text-white shadow">
            <div className="card-body">
              <h5>Total Workouts</h5>
              <h3>{workouts.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-3 mt-md-0">
          <div className="card bg-dark text-white shadow">
            <div className="card-body">
              <h5>Calories Burned (Estimate)</h5>
              <h3>{totalCalories} kcal</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Goal */}
      <div className="mb-4">
        <h4>🎯 Weekly Goal Tracker</h4>
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Set your goal (workouts per week)"
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value))}
        />
        <p>{`${goal > 0 ? workouts.length : 0} out of ${goal} workouts completed`}</p>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${goal > 0 ? Math.min((workouts.length / goal) * 100, 100) : 0}%`,
            }}
            aria-valuenow={workouts.length}
            aria-valuemin="0"
            aria-valuemax={goal}
          ></div>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-5">
        <h4>📊 Weekly Workout Chart</h4>
        {workoutData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workoutData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="duration" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-muted">No workout data available to show the chart.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;






