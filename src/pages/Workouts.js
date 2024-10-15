/*import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the import according to your firebase config file
import WorkoutCard from '../components/WorkoutCard';
import WorkoutForm from '../components/WorkoutForm';
import '../assets/styles/Workouts.css'; // Adjust the path if needed

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    // Fetch existing workouts if necessary
    const fetchWorkouts = async () => {
      // Your fetching logic (if you need to display existing workouts)
    };
    fetchWorkouts();
  }, []);

  // Function to add a new workout
  const handleAddWorkout = async (newWorkout) => {
    try {
      const docRef = await addDoc(collection(db, 'workouts'), newWorkout);
      setWorkouts((prevWorkouts) => [...prevWorkouts, { id: docRef.id, ...newWorkout }]);
      console.log("Workout added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding workout: ", error);
    }
  };

  return (
    <div className="workouts-container">
      <h2>Your Workouts</h2>
      <WorkoutForm onAddWorkout={handleAddWorkout} />
      <div className="workouts-list">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
}

export default Workouts;*/

import React, { useState } from 'react';
import WorkoutCard from '../components/WorkoutCard';
import WorkoutForm from '../components/WorkoutForm'; 
import { doc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Ensure correct Firebase config path
import '../assets/styles/Workouts.css'; 
import { useUser } from '../contexts/UserContext';

const workoutData = [  
  {
    id: 1,
    type: 'Pushups',
    gifUrl: 'https://www.lornajane.com.au/on/demandware.static/-/Library-Sites-shared_library/default/dw767356b7/blog/july/best-arm-workouts-for-summer/best-arm-workouts-push-ups-blue-leggings.gif',
    caloriesBurned: 200,
    duration: 15, // in minutes
    heartRate: { avg: 85, max: 120 },
    steps: 0,
    notes: "Completed 3 sets of 20 reps",
  },
  {
    id: 2,
    type: 'Squats',
    gifUrl: 'https://media1.tenor.com/m/1NY6qOs30XIAAAAC/goblet-squad.gif',
    caloriesBurned: 250,
    duration: 20,
    heartRate: { avg: 88, max: 130 },
    steps: 0,
    notes: "Deep squats with weights",
  },
  {
    id: 3,
    type: 'Jumping Jacks',
    gifUrl: 'https://i.pinimg.com/originals/05/38/ca/0538ca92ee45429ee0df18d5a5799bfd.gif',
    caloriesBurned: 180,
    duration: 10,
    heartRate: { avg: 92, max: 145 },
    steps: 1500,
    notes: "Warm-up session",
  },
  {
    id: 4,
    type: 'Walking',
    gifUrl: 'https://media.tenor.com/images/ce558b14c996afa63c6f7c97f8c6598f/tenor.gif',
    caloriesBurned: 100,
    duration: 30,
    heartRate: { avg: 70, max: 90 },
    steps: 3000,
    notes: "Morning walk around the park",
  },
  {
    id: 5,
    type: 'Jump Rope',
    gifUrl: 'https://i.pinimg.com/originals/1c/f2/f0/1cf2f0ee8b165b853f076b2fa4154266.gif',
    caloriesBurned: 350,
    duration: 15,
    heartRate: { avg: 110, max: 160 },
    steps: 0,
    notes: "Intense cardio session",
  },
  {
    id: 6,
    type: 'Bench Press',
    gifUrl: 'https://i.pinimg.com/originals/51/1f/75/511f758a1ef6d337f075b820c4cc49de.gif',
    caloriesBurned: 220,
    duration: 25,
    heartRate: { avg: 95, max: 130 },
    steps: 0,
    notes: "Heavyweight training",
  },
];

function Workouts() {
    const { user } = useUser();
    const [workouts, setWorkouts] = useState(workoutData); // Manage workouts in state
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    
    const handleWorkoutClick = (workout) => {
      setSelectedWorkout(workout); // Show details and form for clicked workout
    };
  
    const handleAddWorkout = (newWorkout) => {
      console.log('New workout added:', newWorkout);
      setSelectedWorkout(null); // Reset the selected workout after adding
    };
  
    const handleUpdateWorkout = async (updatedWorkout) => {
        // Assign random userId if not defined
        if (!updatedWorkout.userId) {
          /*updatedWorkout.userId = `user_${Math.floor(Math.random() * 1000)}`;*/
          updatedWorkout.userId =user.uid;
        }
    
        // Update workout in local state
        const updatedWorkouts = workouts.map((workout) =>
          workout.id === updatedWorkout.id ? updatedWorkout : workout
        );
        setWorkouts(updatedWorkouts);
    
        // Add Firestore update logic
        try {
          if (updatedWorkout.docId) {
            // Update existing document
            const workoutRef = doc(collection(db, 'workouts'), updatedWorkout.docId);
            await updateDoc(workoutRef, {
              caloriesBurned: updatedWorkout.caloriesBurned,
              duration: updatedWorkout.duration,
              heartRate: updatedWorkout.heartRate,
              steps: updatedWorkout.steps,
              notes: updatedWorkout.notes,
              userId: updatedWorkout.userId,
            });
            console.log('Workout updated successfully');
          } else {
            // Add new document
            const newWorkoutRef = await addDoc(collection(db, 'workouts'), {
              ...updatedWorkout,
            });
            updatedWorkout.docId = newWorkoutRef.id; // Save docId for future updates
            console.log('New workout added to Firestore');
          }
        } catch (error) {
          console.error('Error updating workout:', error);
        }
    
        setSelectedWorkout(null); // Reset the selected workout after updating
      };
  
    return (
      <div className="workouts-container">
        <h2>Your Workouts</h2>
        <div className="workout-cards">
          {workouts.map((workout) => (
            <WorkoutCard 
              key={workout.id} 
              workout={workout} 
              onClick={() => handleWorkoutClick(workout)} 
              onUpdate={handleUpdateWorkout} // Pass onUpdate function
            />
          ))}
        </div>
  
        {selectedWorkout && (
          <div className="workout-form-container">
            <WorkoutForm 
              workout={selectedWorkout} 
              onAddWorkout={handleAddWorkout} 
              onUpdate={handleUpdateWorkout} // Pass the update handler to WorkoutForm if needed
            />
            <button onClick={() => setSelectedWorkout(null)}>Cancel</button>
          </div>
        )}
      </div>
    );
  }
  
  export default Workouts;
