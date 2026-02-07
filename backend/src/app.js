import express from 'express';
import taskRoutes from './routes/task.route.js';
import cors from 'cors';
const app=express()
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // Enable CORS for requests from the React frontend
app.use('/task/api/v1',taskRoutes);
// example of a route http://localhost:4000/task/api/v1/add
export default app;

