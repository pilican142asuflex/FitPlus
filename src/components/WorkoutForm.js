import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the import according to your firebase config file

function WorkoutForm({ workout, onAddWorkout }) {
  const [workoutName, setWorkoutName] = useState(workout ? workout.name : '');
  const [description, setDescription] = useState(workout ? workout.description : '');
  const [gifUrl, setGifUrl] = useState(workout ? workout.gifUrl : '');
  const [caloriesBurned, setCaloriesBurned] = useState(workout ? workout.caloriesBurned : '');
  const [duration, setDuration] = useState(workout ? workout.duration : '');
  const [avgHeartRate, setAvgHeartRate] = useState(workout?.heartRate?.avg || '');
  const [maxHeartRate, setMaxHeartRate] = useState(workout?.heartRate?.max || '');
  const [notes, setNotes] = useState(workout ? workout.notes : '');
  const [steps, setSteps] = useState(workout ? workout.steps : '');
  const [type, setType] = useState(workout ? workout.type : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newWorkout = {
      name: workoutName,
      description,
      gifUrl,
      caloriesBurned: Number(caloriesBurned),
      date: new Date().toISOString(), // Current timestamp
      duration: Number(duration),
      heartRate: {
        avg: Number(avgHeartRate),
        max: Number(maxHeartRate),
      },
      notes,
      steps: Number(steps),
      type,
      userId: '12345', // Set this dynamically based on the logged-in user
    };

    // Add the workout to Firestore
    try {
      await addDoc(collection(db, 'workouts'), newWorkout);
      onAddWorkout(newWorkout); // Call the function passed from Workouts
      // Reset form fields
      setWorkoutName('');
      setDescription('');
      setGifUrl('');
      setCaloriesBurned('');
      setDuration('');
      setAvgHeartRate('');
      setMaxHeartRate('');
      setNotes('');
      setSteps('');
      setType('');
    } catch (error) {
      console.error("Error adding workout: ", error);
    }
  };

  useEffect(() => {
    if (workout) {
      setWorkoutName(workout.name);
      setDescription(workout.description);
      setGifUrl(workout.gifUrl);
      setCaloriesBurned(workout.caloriesBurned);
      setDuration(workout.duration);
      setAvgHeartRate(workout.heartRate.avg);
      setMaxHeartRate(workout.heartRate.max);
      setNotes(workout.notes);
      setSteps(workout.steps);
      setType(workout.type);
    }
  }, [workout]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
        placeholder="Workout Name"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="text"
        value={gifUrl}
        onChange={(e) => setGifUrl(e.target.value)}
        placeholder="GIF URL"
        required
      />
      <input
        type="number"
        value={caloriesBurned}
        onChange={(e) => setCaloriesBurned(e.target.value)}
        placeholder="Calories Burned"
        required
      />
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration (minutes)"
        required
      />
      <input
        type="number"
        value={avgHeartRate}
        onChange={(e) => setAvgHeartRate(e.target.value)}
        placeholder="Average Heart Rate"
        required
      />
      <input
        type="number"
        value={maxHeartRate}
        onChange={(e) => setMaxHeartRate(e.target.value)}
        placeholder="Maximum Heart Rate"
        required
      />
      <input
        type="text"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes"
      />
      <input
        type="number"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        placeholder="Steps"
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="">Select Workout Type</option>
        <option value="cardio">Cardio</option>
        <option value="strength">Strength</option>
        <option value="flexibility">Flexibility</option>
      </select>
      <button type="submit">Add Workout</button>
    </form>
  );
}

export default WorkoutForm;
