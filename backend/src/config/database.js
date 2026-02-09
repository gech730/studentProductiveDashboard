import mongoose from "mongoose";
const connectDB= async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB successfully");
  }catch(error){
    console.log("error connecting to mongodb",error)
    
  };
  
}
export {connectDB};