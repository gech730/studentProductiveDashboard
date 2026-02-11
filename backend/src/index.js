import app from './app.js';
import  { connectDB } from './config/database.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT=process.env.PORT || 8000;

await connectDB();
app.get("/", (req, res) => {
  res.send("Server is running and connected to MongoDB!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
