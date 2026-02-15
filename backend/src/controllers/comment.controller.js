import Comment from '../models/comment.model.js';
const createComment= async (req,res)=>{
  try{
    const {name,email,comment}=req.body;
    if(name==="" || email===""|| comment==="")
      return res.status(400).json({message:"all fields are required"});
    const com= await Comment.create({name,email,comment});
    res.status(201).json({message:"thank you for your comment"});
  }catch(error){
    res.status(500).json({message:error});
  }
}
export {createComment};