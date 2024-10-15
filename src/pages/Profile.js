// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext'; // Custom hook to get user context
import { db } from '../firebaseConfig'; // Firebase configuration
import { collection, getDocs } from 'firebase/firestore';
import '../assets/styles/Profile.css'; // Import your styles

function Profile() {
  const { user } = useUser(); // Get the user from context
  const [data, setData] = useState({
    workouts: [],
    reminders: [],
    goals: [],
    progress: []
  });

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        // Fetch workouts
        const workoutsCollection = collection(db, 'workouts');
        const workoutsSnapshot = await getDocs(workoutsCollection);
        const workoutsList = workoutsSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(workout => workout.userId === user.uid); // Filter by userId

        // Fetch reminders
        const remindersCollection = collection(db, 'reminders');
        const remindersSnapshot = await getDocs(remindersCollection);
        const remindersList = remindersSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(reminder => reminder.userId === user.uid); // Filter by userId

        // Fetch goals
        const goalsCollection = collection(db, 'goals');
        const goalsSnapshot = await getDocs(goalsCollection);
        const goalsList = goalsSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(goal => goal.userId === user.uid); // Filter by userId

        // Fetch progress (if applicable)
        const progressCollection = collection(db, 'progress'); // Change this to the correct collection if needed
        const progressSnapshot = await getDocs(progressCollection);
        const progressList = progressSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(progress => progress.userId === user.uid); // Filter by userId

        // Set state with fetched data
        setData({
          workouts: workoutsList,
          reminders: remindersList,
          goals: goalsList,
          progress: progressList
        });
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <h3>Workouts</h3>
      <ul>
        {data.workouts.length > 0 ? (
          data.workouts.map(workout => (
            <li key={workout.id}>
              <p>Type: {workout.type}</p>
              <p>Calories Burned: {workout.caloriesBurned}</p>
              {/* Add other workout details as needed */}
            </li>
          ))
        ) : (
          <p>No workouts recorded.</p>
        )}
      </ul>

      <h3>Reminders</h3>
      <ul>
        {data.reminders.length > 0 ? (
          data.reminders.map(reminder => (
            <li key={reminder.id}>
              <p>Reminder: {reminder.message}</p>
              <p>Time: {reminder.time.toDate().toString()}</p> {/* Ensure time is formatted correctly */}
              {/* Add other reminder details as needed */}
            </li>
          ))
        ) : (
          <p>No reminders set.</p>
        )}
      </ul>

      <h3>Goals</h3>
      <ul>
        {data.goals.length > 0 ? (
          data.goals.map(goal => (
            <li key={goal.id}>
              <p>Goal: {goal.description}</p>
              {/* Add other goal details as needed */}
            </li>
          ))
        ) : (
          <p>No goals set.</p>
        )}
      </ul>

      <h3>Progress</h3>
      <ul>
        {data.progress.length > 0 ? (
          data.progress.map(progress => (
            <li key={progress.id}>
              <p>Progress Detail: {progress.detail}</p>
              {/* Add other progress details as needed */}
            </li>
          ))
        ) : (
          <p>No progress recorded.</p>
        )}
      </ul>
    </div>
  );
}

export default Profile;
