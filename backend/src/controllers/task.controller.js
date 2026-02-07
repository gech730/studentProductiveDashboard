import Task from '../models/task.model.js'
const createTask=async(req,res)=>{
  try{
    const {title}=req.body;
    if(!title){
      return res.status(400).json({message:"please add a task "})
    }
    const task=await Task.create({title})
    res.status(201).json(task)
  }catch(error){
    res.status(500).json({message:"internal server error"})
  }
}
const getTask=async(req,res)=>{
  try{
   const tasks=await Task.find()
   if(tasks.length===0){
    return res.status(404).json({message:"no task found"})
   }
    res.status(200).json(tasks)
  }catch(error){
    res.status(500).json({message:"there is internal server error"})
  }
}
const updateTask=async(req,res)=>{
  try{
    if(Object.keys(req.body).length===0){
      return res.status(400).json({message:"no data provided for update"})
    }
    const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!task){
      return res.status(404).json({message:"task not found"})
    }
    res.status(200).json(task)

  }catch(error){
    res.status(500).json({message:"there is internal server error"})
  }
}
const deleteTask=async(req,res)=>{
  try{
    const task=await Task.findByIdAndDelete(req.params.id)  
    if(!task){
      return res.status(404).json({message:"task not found"})
    }
    res.status(200).json({message:"task deleted successfully"})
  }catch(error){
    res.status(500).json({message:"there is internal server error"})
  }}
export {createTask,getTask,updateTask,deleteTask};