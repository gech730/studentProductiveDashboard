const API = import.meta.env.VITE_AUT_URL;
const apiUrl=import.meta.env.VITE_API_URL;

 const loginRequest = async (email, password) => {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

 const fetchDashboard = async (token) => {
  const res = await fetch(`${API}/dashboard`, {
    headers: {
      Authorization: token,
    },
  });

  return res.text();
};
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
export {createTask,getTasks,updateTask,deleteTask,loginRequest,fetchDashboard}