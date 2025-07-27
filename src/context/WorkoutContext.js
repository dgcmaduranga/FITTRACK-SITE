import React, { createContext, useContext, useState, useEffect } from 'react';

const WorkoutContext = createContext();
export const useWorkouts = () => useContext(WorkoutContext);

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState(() => {
    const stored = localStorage.getItem('fittrack-workouts');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('fittrack-workouts', JSON.stringify(workouts));
  }, [workouts]);

  const addWorkout = (workout) => {
    setWorkouts(prev => [...prev, workout]);
  };

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
};
