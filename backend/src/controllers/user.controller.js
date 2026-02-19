import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js'
import dotenv from 'dotenv';
dotenv.config();
const register=async (req,res)=>{
try{
  const {name,email,password}=req.body;
  if(!name || !email || !password)
    return res.status(400).json({message:"all fields are required"});
   const hashed=await bcrypt.hash(password,10);
    const user= await User.create({name,email,password:hashed});
    res.status(201).json(user);
}catch(error){
 res.status(500).json({message:"internal server error",error});
}
}
const login= async(req,res)=>{
 try{
   const {email,password}=req.body;
   const user= await User.findOne({email});
   if(!user)
    return res.status(404).json({message:"user not found (please register first)"});
    const isValid= await bcrypt.compare(password,user.password);
     if(!isValid)
      return res.status(400).json({message:"Wrong password"});
     const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.json({ token });


 } catch(error){
  res.status(500).json({message:"internal server error",error})
 }
}

export {register,login}