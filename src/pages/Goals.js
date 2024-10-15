import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; // Firebase configuration
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useUser } from '../contexts/UserContext'; // Custom hook to access user context
import '../assets/styles/Goals.css'; // Import your CSS styles

function Goals() {
    const { user } = useUser(); // Get the user from context
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState('');

    useEffect(() => {
        const fetchGoals = async () => {
            if (!user) return; // Don't fetch if the user is not logged in

            try {
                const goalsCollection = collection(db, 'goals');
                const goalsSnapshot = await getDocs(goalsCollection);
                const goalsList = goalsSnapshot.docs
                    .map(doc => ({ id: doc.id, ...doc.data() }))
                    .filter(goal => goal.userId === user.uid); // Filter by userId

                setGoals(goalsList);
            } catch (error) {
                console.error('Error fetching goals:', error);
            }
        };

        fetchGoals();
    }, [user]); // Refetch goals if the user changes

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newGoal || !user) return; // Do nothing if the goal is empty or user is not logged in

        try {
            await addDoc(collection(db, 'goals'), {
                description: newGoal,
                userId: user.uid, // Set userId to the logged-in user's ID
            });

            // Reset the input field
            setNewGoal('');

            // Fetch goals again to update the list
            const goalsCollection = collection(db, 'goals');
            const goalsSnapshot = await getDocs(goalsCollection);
            const goalsList = goalsSnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(goal => goal.userId === user.uid);
                
            setGoals(goalsList);
        } catch (error) {
            console.error('Error adding goal:', error);
        }
    };

    return (
        <div className="goals-container">
            <h2>Your Goals</h2>

            <form onSubmit={handleSubmit} className="create-goal-form">
                <input
                    type="text"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    placeholder="Enter your fitness goal"
                    required
                />
                <button type="submit">Add Goal</button>
            </form>

            {goals.length > 0 ? (
                <ul>
                    {goals.map(goal => (
                        <li key={goal.id}>
                            {goal.description}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No goals found. Add your first goal!</p>
            )}
        </div>
    );
}

export default Goals;
