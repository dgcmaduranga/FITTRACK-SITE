// src/Pages/WorkoutPage.js
import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Papa from "papaparse";

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const workoutCollection = collection(db, "workouts");
    const snapshot = await getDocs(workoutCollection);
    const workoutList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setWorkouts(workoutList);
  };

  const exportToCSV = () => {
    const data = workouts.map((w) => ({
      Name: w.name,
      Duration: w.duration,
      Calories: w.calories,
      Date: w.date?.toDate ? w.date.toDate().toLocaleDateString() : "N/A",
    }));

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "workouts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this workout?");
    if (confirmDelete) {
      await deleteDoc(doc(db, "workouts", id));
      setWorkouts(workouts.filter((w) => w.id !== id));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Workouts</h2>

      <button onClick={exportToCSV} className="btn btn-success mb-3">
        📥 Download as CSV
      </button>

      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <table className="table table-striped table-dark table-bordered">
          <thead>
            <tr>
              <th>Workout Name</th>
              <th>Duration (min)</th>
              <th>Calories Burned</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout.id}>
                <td>{workout.name}</td>
                <td>{workout.duration}</td>
                <td>{workout.calories}</td>
                <td>
                  {workout.date?.toDate
                    ? workout.date.toDate().toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(workout.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WorkoutPage;

