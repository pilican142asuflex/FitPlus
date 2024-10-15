// src/components/Header.js
/*import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import '../assets/styles/Header.css';

function Header() {
  const { user } = useUser();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/Home"><h1>Fitness Tracker</h1></Link>
      </div>

      <nav className="nav-links">
        <NavLink to="/Home" className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
        <NavLink to="/Workouts" className={({ isActive }) => (isActive ? 'active-link' : '')}>Workouts</NavLink>
        <NavLink to="/Progress" className={({ isActive }) => (isActive ? 'active-link' : '')}>Progress</NavLink>
        <NavLink to="/Goals" className={({ isActive }) => (isActive ? 'active-link' : '')}>Goals</NavLink>
        <NavLink to="/Reminders" className={({ isActive }) => (isActive ? 'active-link' : '')}>Reminders</NavLink>
      </nav>

      <div className="header-actions">
        <div className="search-bar">
          <input type="text" placeholder="Search workouts..." aria-label="Search workouts" />
          <button type="button" aria-label="Search">🔍</button>
        </div>

        <div className="notification-icon">
          <span>🔔</span>
        </div>

        {user ? (
          <div className="user-icon" onClick={toggleDropdown} aria-expanded={dropdownVisible}>
            <img src="/path/to/user-icon.png" alt="User Icon" />
            {dropdownVisible && (
              <div className="dropdown-menu">
                <Link to="/Profile">Profile</Link>
                <Link to="/Settings">Settings</Link>
                <Link to="/Logout">Logout</Link>
              </div>
            )}
          </div>
        ) : (
            
          <Link to="/Login" className="login-link">Login</Link>
        )}
      </div>
    </header>
  );
}

export default Header;*/
// src/components/Header.js
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import '../assets/styles/Header.css';

function Header() {
  const { user } = useUser();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Function to show dropdown
  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  // Function to hide dropdown only when mouse leaves both user icon and dropdown
  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/Home"><h1>FitPlus Fitness Tracker</h1></Link>
      </div>

      <nav className="nav-links">
        <NavLink to="/Home" className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
        <NavLink to="/Workouts" className={({ isActive }) => (isActive ? 'active-link' : '')}>Workouts</NavLink>
        <NavLink to="/Progress" className={({ isActive }) => (isActive ? 'active-link' : '')}>Progress</NavLink>
        <NavLink to="/Goals" className={({ isActive }) => (isActive ? 'active-link' : '')}>Goals</NavLink>
        <NavLink to="/Reminders" className={({ isActive }) => (isActive ? 'active-link' : '')}>Reminders</NavLink>
      </nav>

      <div className="header-actions">
        <div className="search-bar">
          <input type="text" placeholder="Search workouts..." aria-label="Search workouts" />
          <button type="button" aria-label="Search">🔍</button>
        </div>

        <div className="notification-icon">
          <span>🔔</span>
        </div>

        {user ? (
          <div 
            className="user-icon" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            aria-expanded={dropdownVisible}
          >
            <img src="/path/to/user-icon.png" alt="User Icon" />
            {dropdownVisible && (
              <div className="dropdown-menu">
                <Link to="/Profile">Profile</Link>
                <Link to="/Settings">Settings</Link>
                <Link to="/Logout">Logout</Link>
              </div>
            )}
          </div>
        ) : (
          <Link to="/Login" className="login-link">Login</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
