// src/pages/Logout.js
import React, { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    const auth = getAuth();
    const handleLogout = async () => {
      try {
        await signOut(auth); // Sign out the user
        navigate('/Login'); // Redirect to Login page after logout
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
}

export default Logout;
