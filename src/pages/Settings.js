// src/pages/Settings.js
import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext'; // Custom hook to get user context
import { db } from '../firebaseConfig'; // Firebase configuration
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import '../assets/styles/Settings.css'; // Import your styles

function Settings() {
  const { user } = useUser(); // Get the user from context
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    name: '',
    weight: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setFormData(userDoc.data()); // Set the form data to the user's data
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, formData);
      alert('Profile updated successfully!'); // Notify user of successful update
    }
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Gender:
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Height (cm):
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Weight (kg):
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Settings;

