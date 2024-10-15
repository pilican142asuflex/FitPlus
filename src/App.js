// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Use Routes instead of Switch
import { UserProvider } from './contexts/UserContext';

import Header from './components/Header';
import Home from './pages/Home';
import Workouts from './pages/Workouts';
import Progress from './pages/Progress';
import Goals from './pages/Goals';
import Reminders from './pages/Reminders';
import NotFound from './pages/NotFound'; // Optional, if you have a NotFound page*/
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Logout from './pages/Logout';
function App() {
  
  return (
    <UserProvider>
      <Router>
        <div>
          <Header />
            <Routes>
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Workouts" element={<Workouts />} />
              <Route path="/Progress" element={<Progress />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Logout" element={<Logout />} />
              <Route path="/Goals" element={<Goals />} />
              <Route path="/Reminders" element={<Reminders />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Settings" element={<Settings />} />
              <Route path="/" element={<Navigate to="/Home" />} />
              <Route path="*" element={<NotFound />} /> {/* Fallback for 404 */}
            </Routes>
        </div>
      </Router>
    </UserProvider>
    
  );
}

export default App;
