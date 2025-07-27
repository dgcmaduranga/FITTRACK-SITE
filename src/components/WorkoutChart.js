import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
  { day: 'Mon', workouts: 1 },
  { day: 'Tue', workouts: 0 },
  { day: 'Wed', workouts: 2 },
  { day: 'Thu', workouts: 1 },
  { day: 'Fri', workouts: 3 },
  { day: 'Sat', workouts: 0 },
  { day: 'Sun', workouts: 1 },
];

const WorkoutChart = () => {
  return (
    <div className="mt-4">
      <h5 className="text-center mb-3">📊 Weekly Workout Chart</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="workouts" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkoutChart;
