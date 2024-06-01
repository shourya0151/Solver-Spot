import React from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  var navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout functionality
    console.log('logout');
    localStorage.removeItem("jwt");
    navigate('/');
  };

  const handleAdd = () => {
    // Handle add functionality
  };

  return (
    <nav className="navbar dark-theme">
      <div className="navbar-left">
        <h1 className="navbar-heading">OJ Project</h1>
      </div>
      <div className="navbar-right">
        <button className="add-button" onClick={handleAdd}>Add</button>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
