import app from './app.js';
import connectDb from './config/database.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT=process.env.PORT || 8000;
const startServer=async()=>{
  try{
    await connectDb();
   
   app.use("error",error=>{
    console.error("Server error:", error);
   });
  }catch(error){
    console.log("Error starting server:", error);

  }
}
startServer();
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})