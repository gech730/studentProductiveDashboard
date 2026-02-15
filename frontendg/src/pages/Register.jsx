import React, { useState } from "react";
import { Link,useNavigate } from 'react-router-dom';
import '../css/register.css';
import {register} from '../utils/api.js';
function Register() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try{
         e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

   
    await register({name:formData.name ,email:formData.email ,password:formData.password })
    // 👉 Later send to backend here

    alert("successfully registered");
    // reset form
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    navigate('/program');

    }
    catch(error){
      console.log(error);
    }
 
  };

  return (
    <div className="register-container">

      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
         <p className="mono" >if you have account {"  "}<Link to="/login">Login</Link></p>
      </form>

    </div>
  );
}

export default Register;
