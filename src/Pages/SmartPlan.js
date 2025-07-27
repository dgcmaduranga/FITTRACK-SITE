// src/Pages/SmartPlan.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const SmartPlan = () => {
  const { currentUser } = useAuth();
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [plan, setPlan] = useState(null);

  const calculateBMI = (feet, inches, weightKg) => {
    const heightMeters = ((parseInt(feet) * 12) + parseInt(inches)) * 0.0254;
    return (weightKg / (heightMeters * heightMeters)).toFixed(1);
  };

  const generateWorkoutPlan = (bmi, gender) => {
    if (bmi < 18.5) return 'Light strength training and high-calorie nutrition plan';
    if (bmi >= 18.5 && bmi < 25) return 'Balanced workout: cardio + strength 5 days/week';
    if (bmi >= 25) return 'Weight loss focus: cardio, HIIT, and calorie deficit diet';
  };

  const generateMealPlan = (bmi, gender) => {
    if (bmi < 18.5) {
      return {
        breakfast: 'Oats + peanut butter + milkshake',
        lunch: 'Rice + chicken curry + salad',
        dinner: 'Pasta + eggs + yogurt'
      };
    } else if (bmi >= 25) {
      return {
        breakfast: 'Oatmeal + green tea',
        lunch: 'Grilled chicken + veggies',
        dinner: 'Salad + boiled egg + herbal tea'
      };
    } else {
      return {
        breakfast: 'Whole grain bread + eggs',
        lunch: 'Rice + lean meat + salad',
        dinner: 'Chapati + chicken + yogurt'
      };
    }
  };

  const handleGenerate = async () => {
    const bmi = calculateBMI(heightFeet, heightInches, weight);
    const workoutPlan = generateWorkoutPlan(bmi, gender);
    const mealPlan = generateMealPlan(bmi, gender);

    const newPlan = {
      bmi,
      workoutPlan,
      mealPlan,
      user: currentUser.email,
      createdAt: serverTimestamp()
    };

    await addDoc(collection(db, 'smartplans'), newPlan);
    setPlan(newPlan);
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h3 className="mb-3">Smart Fitness Plan 🧠</h3>
        <div className="row">
          <div className="col">
            <label>Height (ft)</label>
            <input type="number" className="form-control" value={heightFeet} onChange={(e) => setHeightFeet(e.target.value)} />
          </div>
          <div className="col">
            <label>Height (in)</label>
            <input type="number" className="form-control" value={heightInches} onChange={(e) => setHeightInches(e.target.value)} />
          </div>
        </div>
        <label className="mt-2">Weight (kg)</label>
        <input type="number" className="form-control" value={weight} onChange={(e) => setWeight(e.target.value)} />

        <label className="mt-2">Age</label>
        <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />

        <label className="mt-2">Gender</label>
        <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <button className="btn btn-primary mt-3" onClick={handleGenerate}>Generate Plan</button>
      </div>

      {plan && (
        <div className="card p-4 mt-4">
          <h4>BMI: {plan.bmi}</h4>
          <h5 className="mt-3">🏋️ Workout Plan:</h5>
          <p>{plan.workoutPlan}</p>

          <h5>🍽️ Meal Plan:</h5>
          <ul>
            <li><strong>Breakfast:</strong> {plan.mealPlan.breakfast}</li>
            <li><strong>Lunch:</strong> {plan.mealPlan.lunch}</li>
            <li><strong>Dinner:</strong> {plan.mealPlan.dinner}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SmartPlan;
