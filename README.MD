# Student Productivity Dashboard

A **full-stack web application** to help students manage their tasks efficiently. Users can **add tasks, mark them as completed, delete tasks, and filter by status**. The app is built with **React for the frontend** and **Node.js/Express with MongoDB** for the backend.

---

## Table of Contents

- [Features](#features)
- [Tech Stac](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## Features

- Add new tasks with a title
- Mark tasks as **completed** or **pending**
- Delete tasks
- Filter tasks: All / Completed / Pending
- Daily summary: total, completed, and pending tasks
- Fully integrated frontend with backend API

---

## Tech Stack

- **Frontend:** React, HTML, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (Atlas or local)
- **Others:** CORS

---

## Project Structure

```
studentProductiveDashboard/
├── backend/
│   ├── src/
│   │    ├── config/
│   │    ├── controllers/
│   │    ├── routes/
│   │    ├── models/
│   │    ├── app.js
│   │    └── index.js
│   └── package.json
├── frontend/
│    ├── public/
│    ├── index.html
│    ├── src/
│    │   ├── components/
│    │   ├── css/
│    │   ├── main.js
│    │   ├── api.js
│    │   └── App.jsx
│    └── package.json
└── README.md
```

## Setup & Installation

### Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file with your MongoDB URI:

```
MONGO_URI=<your_mongodb_uri>
PORT=4000
```

4. Start the server:

```
npm start
```

The backend will run on http://localhost:4000.

### Frontend

---

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```
npm install
```

3. Start the React app:

```
npm start
```

The frontend will run on **http://localhost:3000**.

Make sure api.js points to the correct backend URL.

## API Endpoints

| Method | Endpoint               | Description        |
| ------ | ---------------------- | ------------------ |
| GET    | /task/api/v1/all       | Get all tasks      |
| POST   | /task/api/v1/tasks     | Create a new task  |
| PUT    | /task/api/v1/tasks/:id | Update task status |
| DELETE | /task/api/v1/tasks/:id | Delete a task      |

_Note:_ The frontend fetches and updates tasks using these API endpoints.

# Usage

1. Open the React app in your browser (http://localhost:3000)

2. Add a new task using the input field and click Add Task

3. Mark tasks as completed with the checkbox

4. Delete tasks using the delete button

5. Filter tasks using All / Completed / Pending buttons

6. Check the summary section for daily statistics

# Future Improvements

- User authentication (login/logout)

- Task deadlines & reminders

- Drag-and-drop task reordering

- Export tasks to CSV or PDF

- Dark mode toggle

# Author

## Getacher Kifilie

- **Email**: [getacherkifilie23@gmail.com](getacherkifilie23@gmail.com)

- **Github**: https://github.com/gech730
