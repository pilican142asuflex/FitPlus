import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the import according to your firebase config file
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../assets/styles/Home.css'; // Adjust the path if needed

function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate(); // Initialize useNavigate
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, [auth]);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/Login'); // Redirect to the Login page after logout
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if the user is logged in
  return (
    <div className="home-container">
      {auth.currentUser ? (
        <>
          <h2>Welcome {userData?.name || 'User'}</h2>
          <div>
            <p>Email: {userData?.email}</p>
            <p>Age: {userData?.age}</p>
            <p>Weight: {userData?.weight}</p>
            <p>Height: {userData?.height}</p>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <h2>Please log in to view your progress</h2>
          <div className="fitplus-info">
            <h3>About FitPlus</h3>
            <p>FitPlus is your go-to platform for tracking workouts, setting fitness goals, and maintaining a healthy lifestyle. Whether you're a beginner or an experienced fitness enthusiast, we have everything you need to achieve your fitness goals!</p>
          </div>
          <button onClick={() => navigate('/Login')}>Log In</button>
        </>
      )}

      {/* This workout GIF section will be shown to all users */}
      <div className="workout-video">
        <h3>Check out our workout routine!</h3>
        <img src="https://cdn.dribbble.com/users/525747/screenshots/2832504/jog_ui.gif" alt="Workout GIF" />
      </div>
    </div>
  );
}

export default Home;
