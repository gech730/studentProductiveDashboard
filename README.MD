# StudyFlow — Student Productivity Dashboard

A full-stack web application to help students manage their tasks efficiently. Users can add tasks, mark them as completed, delete tasks, and filter by status. Built with **React** on the frontend and **Node.js/Express + MongoDB** on the backend.

---

## Features

- User registration and login (JWT auth)
- Create, edit, delete, and filter tasks
- Task status tracking: Pending / In Progress / Completed
- Due dates and progress stats
- Profile management with avatar upload
- Feedback/comments section
- Dark/light theme toggle

---

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React 18, Vite, lucide-react      |
| Backend  | Node.js, Express 5                |
| Database | MongoDB (Atlas or local)          |
| Auth     | JWT (jsonwebtoken), bcrypt        |
| Security | helmet, cors, express-rate-limit  |

---

## Project Structure

```
studentProductiveDashboard/
├── backend/
│   ├── src/
│   │   ├── config/database.js
│   │   ├── controllers/
│   │   ├── middleware/auth.js
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── .env.example
│   └── package.json
├── .gitignore
└── README.MD
```

---

## Local Development

### Prerequisites

- Node.js 18+
- MongoDB (local) or a [MongoDB Atlas](https://www.mongodb.com/atlas) account

### Backend

```bash
cd backend
npm install
cp .env.example .env   # then edit .env with your values
npm run dev
```

Runs on `http://localhost:4000`.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # set VITE_API_BASE=http://localhost:4000/api/v1
npm run dev
```

Runs on `http://localhost:5173`.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable      | Description                                      | Example                          |
|---------------|--------------------------------------------------|----------------------------------|
| `PORT`        | Port the server listens on                       | `4000`                           |
| `NODE_ENV`    | Environment (`development` or `production`)      | `production`                     |
| `MONGO_URL`   | MongoDB connection string                        | `mongodb+srv://...`              |
| `JWT_SECRET`  | Secret key for signing JWTs (keep this private!) | long random string               |
| `CORS_ORIGIN` | Comma-separated list of allowed frontend origins | `https://your-app.vercel.app`    |

Generate a strong JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

### Frontend (`frontend/.env`)

| Variable        | Description              | Example                                      |
|-----------------|--------------------------|----------------------------------------------|
| `VITE_API_BASE` | Backend API base URL     | `https://your-backend.onrender.com/api/v1`   |

---

## Deployment

### Backend — [Render](https://render.com) (recommended)

1. Create a new **Web Service** and connect your repo
2. Set **Root Directory** to `backend`
3. Set **Build Command** to `npm install`
4. Set **Start Command** to `npm start`
5. Add environment variables in the Render dashboard:
   - `NODE_ENV=production`
   - `MONGO_URL=<your Atlas connection string>`
   - `JWT_SECRET=<your secret>`
   - `CORS_ORIGIN=<your frontend URL>`

### Frontend — [Vercel](https://vercel.com) (recommended)

1. Import your repo into Vercel
2. Set **Root Directory** to `frontend`
3. Framework preset: **Vite**
4. Add environment variable:
   - `VITE_API_BASE=https://your-backend.onrender.com/api/v1`
5. Deploy

### Alternative platforms

- **Backend**: Railway, Fly.io, Heroku, DigitalOcean App Platform
- **Frontend**: Netlify, Cloudflare Pages, GitHub Pages (with Vite base config)
- **Database**: MongoDB Atlas (free tier available)

---

## API Endpoints

| Method | Endpoint                  | Auth | Description           |
|--------|---------------------------|------|-----------------------|
| POST   | `/api/v1/auth/register`   | No   | Register a new user   |
| POST   | `/api/v1/auth/login`      | No   | Login                 |
| GET    | `/api/v1/auth/profile`    | Yes  | Get current user      |
| PATCH  | `/api/v1/auth/profile`    | Yes  | Update profile        |
| GET    | `/api/v1/tasks`           | Yes  | Get all user tasks    |
| POST   | `/api/v1/tasks`           | Yes  | Create a task         |
| PATCH  | `/api/v1/tasks/:id`       | Yes  | Update a task         |
| DELETE | `/api/v1/tasks/:id`       | Yes  | Delete a task         |
| GET    | `/api/v1/comments`        | No   | Get all comments      |
| POST   | `/api/v1/comments`        | No   | Post a comment        |
| GET    | `/api/health`             | No   | Health check          |

---

## Author

**Getacher Kifilie**

- Email: [getacherkifilie23@gmail.com](mailto:getacherkifilie23@gmail.com)
- GitHub: [github.com/gech730](https://github.com/gech730)
