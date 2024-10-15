import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext'; // Use the custom hook
import { db } from '../firebaseConfig'; // Firebase configuration
import { collection, getDocs } from 'firebase/firestore';
import { PieChart, Pie, Cell, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import '../assets/styles/Progress.css';

function Progress() {
    const { user } = useUser(); // Get the user from context
    const [workouts, setWorkouts] = useState([]);
    const [lineData, setLineData] = useState([]);
    const [barData, setBarData] = useState([]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            if (user) {
                const workoutsCollection = collection(db, 'workouts');
                const workoutsSnapshot = await getDocs(workoutsCollection);
                const workoutsList = workoutsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                // Filter workouts for the logged-in user
                const userWorkouts = workoutsList.filter(workout => workout.userId === user.uid);
                setWorkouts(userWorkouts);

                // Prepare data for line and bar charts
                const lineDataPrepared = userWorkouts.map(workout => ({
                    date: new Date(workout.date).toLocaleDateString(), // Assuming you have a 'date' field in your workouts
                    caloriesBurned: workout.caloriesBurned,
                }));

                const barDataPrepared = userWorkouts.reduce((acc, workout) => {
                    const existing = acc.find(item => item.type === workout.type);
                    if (existing) {
                        existing.calories += workout.caloriesBurned;
                    } else {
                        acc.push({ type: workout.type, calories: workout.caloriesBurned });
                    }
                    return acc;
                }, []);

                setLineData(lineDataPrepared);
                setBarData(barDataPrepared);
            }
        };

        fetchWorkouts();
    }, [user]);

    return (
        <div className="progress-container">
            <h2>Your Progress</h2>
            {/* Pie Chart */}
            {workouts.length > 0 ? (
                <>
                    <h3>Calories Burned by Workout Type</h3>
                    <PieChart width={400} height={400}>
                        <Pie 
                            data={workouts} 
                            dataKey="caloriesBurned" 
                            nameKey="type" 
                            cx="50%" 
                            cy="50%" 
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        >
                            {workouts.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>

                    {/* Line Chart */}
                    <h3>Calories Burned Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="caloriesBurned" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>

                    {/* Bar Chart */}
                    <h3>Calories Burned by Workout Type</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="type" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="calories" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </>
            ) : (
                <p>No workouts recorded yet.</p>
            )}
        </div>
    );
}

export default Progress;
