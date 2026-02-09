import {User} from '../models/user.model'
const CreateUser=async (req,res)=>{
try{
  const {name,email,password}=req.body;
  if(!name || !email || !password)
    return res.status(400).json({message:"all fields are required"});
    const user= await User.create({name,email,password});
    res.status(201).json({message:"user register successfully"});
}catch(error){
 res.status(500).json({message:"internal server error",error});
}
}
export {CreateUser}