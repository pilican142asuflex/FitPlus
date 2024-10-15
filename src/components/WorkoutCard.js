/*import React from 'react';

function WorkoutCard({ workout ,onClick }) {
  return (
    <div className="workout-card" onClick={onClick}>
      <h3>{workout.name}</h3>
      <p>{workout.description}</p>
      {workout.gifUrl && (
        <img src={workout.gifUrl} alt={`${workout.name} GIF`} className="workout-gif" />
      )}
      <p>Calories Burned: {workout.caloriesBurned}</p>
      <p>Duration: {workout.duration} minutes</p>
      <p>Average Heart Rate: {workout.heartRate.avg} bpm</p>
      <p>Maximum Heart Rate: {workout.heartRate.max} bpm</p>
      <p>Steps: {workout.steps}</p>
      <p>Type: {workout.type}</p>
      <p>Date: {new Date(workout.date).toLocaleString()}</p>
      <p>Notes: {workout.notes}</p>
    </div>
  );
}

export default WorkoutCard;*/
/*import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the import according to your firebase config file

function WorkoutCard({ workout }) {
  const [caloriesBurned, setCaloriesBurned] = useState(workout.caloriesBurned);
  const [duration, setDuration] = useState(workout.duration);
  const [avgHeartRate, setAvgHeartRate] = useState(workout.heartRate.avg);
  const [maxHeartRate, setMaxHeartRate] = useState(workout.heartRate.max);
  const [steps, setSteps] = useState(workout.steps);

  const handleUpdate = async () => {
    try {
      // Ensure workout.id is a valid string ID
      const workoutRef = doc(db, 'workouts', String(workout.id)); // Convert to string if necessary
      await updateDoc(workoutRef, {
        caloriesBurned,
        duration,
        heartRate: {
          avg: avgHeartRate,
          max: maxHeartRate,
        },
        steps,
      });
      console.log('Workout updated in Firestore');
    } catch (error) {
      console.error("Error updating workout: ", error);
    }
  };

  return (
    <div className="workout-card">
      <h3>{workout.type}</h3>
      <img src={workout.gifUrl} alt={workout.type} />
      
      <div>
        <label>Calories Burned: {caloriesBurned}</label>
        <input
          type="range"
          min="0"
          max="500"
          value={caloriesBurned}
          onChange={(e) => setCaloriesBurned(Number(e.target.value))}
          onMouseUp={handleUpdate}
        />
      </div>
      
      <div>
        <label>Duration: {duration} minutes</label>
        <input
          type="range"
          min="0"
          max="60"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          onMouseUp={handleUpdate}
        />
      </div>
      
      <div>
        <label>Average Heart Rate: {avgHeartRate} bpm</label>
        <input
          type="range"
          min="40"
          max="200"
          value={avgHeartRate}
          onChange={(e) => setAvgHeartRate(Number(e.target.value))}
          onMouseUp={handleUpdate}
        />
      </div>
      
      <div>
        <label>Maximum Heart Rate: {maxHeartRate} bpm</label>
        <input
          type="range"
          min="40"
          max="200"
          value={maxHeartRate}
          onChange={(e) => setMaxHeartRate(Number(e.target.value))}
          onMouseUp={handleUpdate}
        />
      </div>
      
      <div>
        <label>Steps: {steps}</label>
        <input
          type="range"
          min="0"
          max="10000"
          value={steps}
          onChange={(e) => setSteps(Number(e.target.value))}
          onMouseUp={handleUpdate}
        />
      </div>
    </div>
  );
}

export default WorkoutCard;*/
import React, { useState } from 'react';

const WorkoutCard = ({ workout, onClick, onUpdate }) => {
  const [calories, setCalories] = useState(workout.caloriesBurned);
  const [duration, setDuration] = useState(workout.duration);
  const [avgHeartRate, setAvgHeartRate] = useState(workout.heartRate.avg);
  const [steps, setSteps] = useState(workout.steps);

  const handleUpdate = () => {
    const updatedStats = {
      ...workout,
      caloriesBurned: calories,
      duration: duration,
      heartRate: { ...workout.heartRate, avg: avgHeartRate },
      steps: steps,
    };
    onUpdate(updatedStats);
  };

  return (
    <div className="workout-card" onClick={onClick}>
      <h3>{workout.type}</h3>
      <img src={workout.gifUrl} alt={workout.type} />
      
      <div>
        <label>Calories Burned:</label>
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(Number(e.target.value))}
        />
        <button onClick={() => setCalories(calories + 1)}>+</button>
        <button onClick={() => setCalories(Math.max(0, calories - 1))}>-</button>
      </div>
      
      <div>
        <label>Duration (min):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
        <button onClick={() => setDuration(duration + 1)}>+</button>
        <button onClick={() => setDuration(Math.max(0, duration - 1))}>-</button>
      </div>
      
      <div>
        <label>Heart Rate (Avg):</label>
        <input
          type="number"
          value={avgHeartRate}
          onChange={(e) => setAvgHeartRate(Number(e.target.value))}
        />
        <button onClick={() => setAvgHeartRate(avgHeartRate + 1)}>+</button>
        <button onClick={() => setAvgHeartRate(Math.max(0, avgHeartRate - 1))}>-</button>
      </div>
      
      <div>
        <label>Steps:</label>
        <input
          type="number"
          value={steps}
          onChange={(e) => setSteps(Number(e.target.value))}
        />
        <button onClick={() => setSteps(steps + 1)}>+</button>
        <button onClick={() => setSteps(Math.max(0, steps - 1))}>-</button>
      </div>

      <p>Notes: {workout.notes}</p>
      <button onClick={handleUpdate}>Update Stats</button>
    </div>
  );
};

export default WorkoutCard;



