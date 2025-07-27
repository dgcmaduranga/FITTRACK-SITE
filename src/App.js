import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { WorkoutProvider } from './context/WorkoutContext';

import Navbar from './components/Navbar';

import HomePage from './Pages/HomePage';
import Dashboard from './Pages/Dashboard';
import ProfilePage from './Pages/ProfilePage';
import WorkoutPage from './Pages/WorkoutPage';
import AddWorkout from './Pages/AddWorkout';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import SmartPlan from './Pages/SmartPlan';
import "./index.css";
import AIChatCoach from './Pages/AIChatCoach';




function App() {
  return (
    <Router>
      <AuthProvider>
        <WorkoutProvider>
          <ThemeProvider>
            <div className="d-flex flex-column min-vh-100">
              <Navbar />
              <main className="flex-grow-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/workouts" element={<WorkoutPage />} />
                  <Route path="/add" element={<AddWorkout />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/smartplan" element={<SmartPlan />} /> {/* ✅ SmartPlan route */}
                  <Route path="/coach" element={<PrivateRoute><AIChatCoach /></PrivateRoute>} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </WorkoutProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;