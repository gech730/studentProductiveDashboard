import express from 'express';
import taskRoutes from './routes/task.route.js';
import userRoutes from './routes/user.route.js'; 
import protectedRoutes from './routes/protected.route.js'; 
import commentRoute from './routes/comment.route.js';
import cors from 'cors';
const app=express()
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // Enable CORS for requests from the React frontend
app.use('/task/api/v1',taskRoutes);
app.use('/user/api/v1',userRoutes);
app.use("/user/api/v1", protectedRoutes);
app.use('/user/api/v1',commentRoute);

// example of a route http://localhost:4000/
export default app;

