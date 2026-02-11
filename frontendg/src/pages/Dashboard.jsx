
import React from 'react';
import '../css/dashboard.css';
export default function Dashboard() {
  return (
    <>
  <header className="header">
    <h1>Student Productivity Dashboard</h1>
  </header>

  <main className="dashboard">

 
    <section className="task-input">

      <h2>Create Study Program</h2>

      <form>

        <input type="text" placeholder="Program Title (e.g. Math Revision)" />

        <textarea placeholder="Describe your study task..."></textarea>

        <select>
          <option>Status: Pending</option>
          <option>Status: In Progress</option>
          <option>Status: Completed</option>
        </select>

        <button type="button">Add Program</button>

      </form>

    </section>

   
    <section className="task-display">

      <h2>Your Programs</h2>

      <div className="task-card pending">
        <h3>Physics Reading</h3>
        <p>Chapter 3 & 4 review</p>
        <span>Pending</span>
      </div>

      <div className="task-card progress">
        <h3>JavaScript Practice</h3>
        <p>Complete array exercises</p>
        <span>In Progress</span>
      </div>

      <div className="task-card completed">
        <h3>Math Assignment</h3>
        <p>Submit algebra homework</p>
        <span>Completed</span>
      </div>

    </section>

  </main>
    </>
  )
}
