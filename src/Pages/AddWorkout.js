import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddWorkout = () => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !duration || !calories || !date) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "workouts"), {
        name,
        duration: Number(duration),
        calories: Number(calories),
        date: new Date(date),
        userId: currentUser.uid,
        createdAt: Timestamp.now(),
      });
      navigate('/workouts');
    } catch (error) {
      console.error("Error adding workout: ", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Workout</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Workout Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g., Chest Day"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Duration (minutes)</label>
          <input
            type="number"
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Calories Burned</label>
          <input
            type="number"
            className="form-control"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Workout</button>
      </form>
    </div>
  );
};

export default AddWorkout;






