// =============================
// AdminDashboard.jsx
// =============================

import React, { useState } from "react";
import {createTask,getTasks,updateTask,deleteTask} from '../utils/api.js'
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");
   const [taskList, setTaskList] = useState([]);
  const [search, setSearch] = useState("");
   React.useEffect(() => {
      const fetchTasks = async () => {
        try {
         const tasksFromDB = await getTasks();
        setTaskList(tasksFromDB);
        
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  
    }, []);
  // Mock data (replace with backend later)
  const users = [
    { id: 1, name: "Alice", role: "Student", status: "Active" },
    { id: 2, name: "Bob", role: "Admin", status: "Inactive" },
  ];

  // const tasks = [
  //   { id: 1, title: "Build dashboard", status: "In Progress" },
  //   { id: 2, title: "Fix login bug", status: "Completed" },
  // ];

  const comments = [
    { id: 1, user: "Alice", text: "This system is great" },
    { id: 2, user: "Bob", text: "Needs dark mode" },
  ];

  const filterData = (data, keys) => {
    return data.filter(item =>
      keys.some(key =>
        item[key].toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const renderUsers = () => {
    const filtered = filterData(users, ["name", "role", "status"]);

    return filtered.map(user => (
      <div key={user.id} className="table-row">
        <span>{user.name}</span>
        <span>{user.role}</span>
        <span>{user.status}</span>
        <button className="action-btn">Edit</button>
      </div>
    ));
  };

  const renderTasks = () => {
    const filtered = filterData(taskList, ["title", "status"]);

    return filtered.map(task => (
      <div key={task.id} className="table-row">
        <span>{task.title}</span>
        <span>{task.status}</span>
        <button className="action-btn">Manage</button>
      </div>
    ));
  };

  const renderComments = () => {
    const filtered = filterData(comments, ["user", "text"]);

    return filtered.map(comment => (
      <div key={comment.id} className="table-row">
        <span>{comment.user}</span>
        <span>{comment.text}</span>
        <button className="action-btn">Review</button>
      </div>
    ));
  };

  const renderContent = () => {
    if (activeTab === "users") return renderUsers();
    if (activeTab === "tasks") return renderTasks();
    return renderComments();
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <button onClick={() => setActiveTab("users")}>
          Users
        </button>
        <button onClick={() => setActiveTab("tasks")}>
          Tasks
        </button>
        <button onClick={() => setActiveTab("comments")}>
          Comments
        </button>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>{activeTab.toUpperCase()} MANAGEMENT</h1>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </header>

        <section className="table-container">
          {renderContent()}
        </section>
      </main>
    </div>
  );
}



