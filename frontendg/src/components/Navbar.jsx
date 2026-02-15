import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils/auth.js';
import '../css/navbar.css'
import logo from '/student-svgrepo-com.svg';
function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className='navbar'>
      <div className="logo">
        <Link to="/">
        <img src={logo} alt="STD" />
        </Link> 
      </div>
      <div className="nav-link">
        <Link to="/">Home</Link> 
        <Link to="/program">program </Link> 
        <Link to="/contact">Contact</Link> 

        {isLoggedIn() ? (
          <button className='logout' onClick={handleLogout}>Logout</button>
        ) : (<>
          <Link to="/login">Login</Link> {"  / "}
          <Link to="/register">Register</Link>
           </>
        )}
      </div>

    </nav>
  );
}

export default Navbar;
