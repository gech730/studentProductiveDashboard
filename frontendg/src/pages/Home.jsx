import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/home.css'
function Home() {
  const navigate=useNavigate()
  return (
    <div className='home-page-container'>

    <div className="main-section">
       <section class="hero">
    <h1 className='welcome'>Welcome to Your Student Dashboard</h1>
    <p>Plan • Track • Achieve Your Goals</p>
    <button onClick={()=>{
      navigate("/program");
    }}>Get Started</button>
       </section>

 
  <section class="features">

    <div class="card">
      <h3>📚 Study Planner</h3>
      <p>Organize your tasks and deadlines.</p>
    </div>

    <div class="card">
      <h3>✅ Task Manager</h3>
      <p>Track your daily productivity.</p>
    </div>

    <div class="card">
      <h3>📊 Progress Tracker</h3>
      <p>Visualize your achievements.</p>
    </div>
    <div class="card">
      <h3>📚 Attention</h3>
      <p>focus on your activity</p>
    </div>

  </section>

    </div>

    </div>
  );
}

export default Home;
