
const  apiUrl=import.meta.env.VITE_API_URL;
const createTask=async (task)=>{
    try {
      const res= await fetch(`${apiUrl}/add`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(task)
      })
      if(!res.ok){
        throw new Error("Failed to create task")
      }
      const data=await res.json()
      console.log(data)
      return data;
    }catch(error){
        console.log(error)
    }
  }
const getTasks=async()=>{
    try {
      const res= await fetch(`${apiUrl}/all`)
      if(!res.ok){
        throw new Error("Failed to fetch tasks")
      }
      const data=await res.json()
      console.log(data)
      return data;
    }catch(error){
        console.log(error)
    }
  }
const updateTask=async(id,updatedTask)=>{
    try {
      const res= await fetch(`${apiUrl}/update/${id}`,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(updatedTask)
      })
      if(!res.ok){
        throw new Error("Failed to update task")
      }
      const data=await res.json()
      console.log(data)
      return data;
    }catch(error){
        console.log(error)
    }
  }
const deleteTask=async(id)=>{
    try {
      const res= await fetch(`${apiUrl}/delete/${id}`,{ method:"DELETE"})
      if(!res.ok){
        throw new Error("Failed to delete task")
      } 
      const data=await res.json();
      console.log(data);
      return data;
    } 
    catch(error){
        console.log(error)
    } 
  }
export {createTask,getTasks,updateTask,deleteTask}
