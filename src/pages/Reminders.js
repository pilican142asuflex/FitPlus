import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useUser } from '../contexts/UserContext'; // Import useUser to get user information
import '../assets/styles/Reminders.css';

function Reminders() {
    const { user } = useUser(); // Get the user from context
    const [reminders, setReminders] = useState([]);
    const [newReminder, setNewReminder] = useState({
        message: '',
        repeat: false,
        time: new Date(),
    });

    useEffect(() => {
        const fetchReminders = async () => {
            if (!user) return; // Don't fetch reminders if user is not logged in

            try {
                const remindersCollection = collection(db, 'reminders');
                const remindersSnapshot = await getDocs(remindersCollection);
                const remindersList = remindersSnapshot.docs
                    .map(doc => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            message: data.message,
                            repeat: data.repeat,
                            time: data.time ? data.time.toDate() : new Date(), // Convert Timestamp to Date
                            userId: data.userId
                        };
                    })
                    // Filter reminders for the logged-in user
                    .filter(reminder => reminder.userId === user.uid);

                setReminders(remindersList);
            } catch (error) {
                console.error('Error fetching reminders:', error);
            }
        };

        fetchReminders();
    }, [user]); // Dependency on user to re-fetch reminders if user changes

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewReminder(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newReminder.message || !user) return; // Do nothing if message is empty or user is not logged in

        try {
            await addDoc(collection(db, 'reminders'), {
                ...newReminder,
                userId: user.uid, // Set the userId to the logged-in user's ID
                time: newReminder.time, // Make sure the time is in the correct format
            });

            // Reset the new reminder form
            setNewReminder({
                message: '',
                repeat: false,
                time: new Date(),
            });

            // Fetch reminders again to update the list
            const remindersCollection = collection(db, 'reminders');
            const remindersSnapshot = await getDocs(remindersCollection);
            const remindersList = remindersSnapshot.docs
                .map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        message: data.message,
                        repeat: data.repeat,
                        time: data.time ? data.time.toDate() : new Date(), // Convert Timestamp to Date
                        userId: data.userId
                    };
                })
                .filter(reminder => reminder.userId === user.uid);
                
            setReminders(remindersList);
        } catch (error) {
            console.error('Error adding reminder:', error);
        }
    };

    return (
        <div className="reminders-container">
            <h2>Your Reminders</h2>

            <form onSubmit={handleSubmit} className="create-reminder-form">
                <input
                    type="text"
                    name="message"
                    value={newReminder.message}
                    onChange={handleInputChange}
                    placeholder="Enter reminder message"
                    required
                />
                <input
                    type="datetime-local"
                    name="time"
                    value={newReminder.time.toISOString().slice(0, 16)} // Formatting for datetime-local
                    onChange={handleInputChange}
                    required
                />
                <label>
                    <input
                        type="checkbox"
                        name="repeat"
                        checked={newReminder.repeat}
                        onChange={handleInputChange}
                    />
                    Repeat
                </label>
                <button type="submit">Add Reminder</button>
            </form>

            {reminders.length > 0 ? (
                <ul>
                    {reminders.map(reminder => (
                        <li key={reminder.id}>
                            <span>{reminder.message}</span>
                            <span>{reminder.time.toString()}</span> {/* Format this as needed */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reminders found.</p>
            )}
        </div>
    );
}

export default Reminders;
