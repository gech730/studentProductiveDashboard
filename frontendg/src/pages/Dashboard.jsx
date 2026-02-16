
import React, { useEffect } from 'react';
import '../css/dashboard.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

import {createTask,getTasks,updateTask,deleteTask} from '../utils/api.js'
export default function Dashboard() {
    const [editingTaskId, setEditingTaskId] = React.useState(null);
     const [editedTask, setEditedTask] =React .useState({
    title: "",
    description: "",
    status: "pending",
     });
  const [title, setTitle] = React.useState('');
   const [description, setDescription]= React.useState('');
  const [status, setStatus] = React.useState('pending');
  const [taskList, setTaskList] = React.useState([]);
    React.useEffect(() => {
      const fetchTasks = async () => {
        try {
         const tasksFromDB = await getTasks();
        setTaskList(tasksFromDB);
        
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  
    }, []);
     const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditedTask({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };
    const saveTask = async (id)=>{
      try{
      const updatedTask=await updateTask(id, editedTask);
     const updatedTasks = taskList.map((t=>t._id===id?updatedTask:t));
     setTaskList(updatedTasks);
    setEditingTaskId(null); // stop editing
      }
   catch(error){
    alert(error)
  }
  };
      const addTask= async (e)=>{
       e.preventDefault(); 
        if (title.trim() === "") return;
        try{
           let newTask="";
           if(description.trim() === "")
             newTask= await createTask({title:title,status:status});
         
         else{
           newTask= await createTask({title:title,description:description,status:status});
         }
          
          const updatedTasks=[...taskList, newTask];
          setTaskList(updatedTasks);
          
        }catch(err){
          alert("all field required",err);        
      }
     const resetForm = () => {
  setTitle("");
  setDescription("");
  setStatus("pending");
};

resetForm();
    }
    const removeTask= async (id)=>{
   await deleteTask(id);
    const updatedTask=taskList.filter(t=>t._id!=id);
    setTaskList(updatedTask);
    }
  return (
    <>
  <header className="header">
    <h1>Student Productivity Dashboard</h1>
  </header>

  <main className="dashboard">

 
    <section className="task-input">

      <h2>Create Study Program</h2>

      <form>

        <input type="text"  value={title} placeholder="Program Title (e.g. Math Revision)" onChange={(e)=>setTitle(e.target.value)}/>

        <textarea value={description} placeholder="Describe your study task..." onChange={(e)=>setDescription(e.target.value)}></textarea>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
      <option value="pending">
        Status: Pending
      </option>

      <option value="In Progress">
        Status: In Progress
      </option>

      <option value="completed">
        Status: Completed
      </option>
</select>


        <button type="button" onClick={addTask}>Add Program</button>

      </form>

    </section>
   
    <section className="task-display">

      <h2>Your Programs</h2>
{taskList.map(task=>(
   <div key={task._id} className={`task-card ${task.status==="In Progress"?"progress":task.status}`}>
 {/* {editable task filed} */}
 {
  editingTaskId === task._id?( 
  <div className='editing-task-input'>
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
              />
              <textarea
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
              />
              <select
                value={editedTask.status}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, status: e.target.value })
                }
              >
                <option value="pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <div className="edit-delete">
                <button
                  onClick={() => saveTask(task._id)}
                  className="edit"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingTaskId(null)}
                  className="delete"
                >
                  Cancel
                </button>
              </div>
  </div>):
  ( 
  <>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <span>{task.status}</span>

              <div className="edit-delete">
                <button onClick={() => startEditing(task)} className="edit">
                  <FaEdit />
                </button>
                <button
                  className="delete"
                  onClick={() => removeTask(task._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </>)}
       
      </div>
))}
    </section>

  </main>

    </>
  )
}
