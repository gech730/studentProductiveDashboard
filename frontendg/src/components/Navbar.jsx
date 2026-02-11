import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils/auth.js';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: 10, background: "#ddd" }}>
      <Link to="/">Home</Link> |{"  "}
      <Link to="/products">Products </Link> |{"  "}
      <Link to="/contact">Contact</Link> |{"  "}

      {isLoggedIn() ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}

export default Navbar;
