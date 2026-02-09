import React from 'react'
import {createTask,getTasks,updateTask,deleteTask} from '../api';
export default function TaskInput() {
  const [taskInput, setTaskInput] = React.useState('');
  const [taskList, setTaskList] = React.useState([]);
  const [filteredTasks, setFilteredTasks] = React.useState(taskList);
  const[numberOfPending,setNumberOfPending]=React.useState(0);
  const[numberOfCompleted,setNumberOfCompleted]=React.useState(0);
  const [activeBtn, setActiveBtn] = React.useState('all');  
  React.useEffect(() => {
    const fetchTasks = async () => {
      try {
       const tasksFromDB = await getTasks();
      setTaskList(tasksFromDB);
      setFilteredTasks(tasksFromDB);
      setNumberOfPending(tasksFromDB.filter(t => t.status === 'pending').length);
      setNumberOfCompleted(tasksFromDB.filter(t => t.status === 'completed').length);
    } catch (err) {
      console.error(err);
    }
  };
  fetchTasks();

  }, []);

  // React.useEffect(()=>{
  //   const taskList=localStorage.getItem('taskList')? JSON.parse(localStorage.getItem('taskList')): [];
  //   const pending=taskList.filter((task)=>task.status==='pending').length;
  //   const completed=taskList.filter((task)=>task.status==='completed').length;
  //   setNumberOfPending(pending);
  //   setNumberOfCompleted(completed);
  // });  
 

  React.useEffect(() => {
    setFilteredTasks(taskList);
  } , [taskList]); 


  const addTask= async (e)=>{
   e.preventDefault(); 
    if (taskInput.trim() === "") return; 
    try{
      const newTask= await createTask({title:taskInput});
      const updatedTasks=[...taskList, newTask];
      setTaskList(updatedTasks);
      setFilteredTasks(updatedTasks);
      setTaskInput('');
      setTaskInput('');
      e.target.previousSibling.value = '';
    }catch(err){
      console.error(err);
    
  }
}
   const logout = () => {
  localStorage.removeItem("token");
};
  const removeTask = async (id) => {
  try {
    await deleteTask(id);
    const updatedTasks = taskList.filter(task => task._id !== id);
    setTaskList(updatedTasks);
    setFilteredTasks(updatedTasks);
  } catch (err) {
    console.error(err);
  }
};
const toggleTaskStatus = async (id) => {
  try {
    const taskToUpdate = taskList.find(task => task._id === id);    
    const updatedStatus = taskToUpdate.status === 'pending' ? 'completed' : 'pending';
    const updatedTask = await updateTask(id, { status: updatedStatus });
    const updatedTasks = taskList.map(task => task._id === id ? updatedTask : task);
    setTaskList(updatedTasks);
    setFilteredTasks(updatedTasks);
  } catch (err) {
    console.error(err);
  } };
  const filterTasks=(status)=>{
    if(status==='all'){
      setFilteredTasks(taskList);  
    }else{
      const filtered=taskList.filter((task)=>task.status===status);
      setFilteredTasks(filtered);
    }
  }
  return (
     <div className="app-container">
     <button style={{ color: "white", fontSize: "30px", backgroundColor: "red" ,padding:"5px",border:"none"}}
       onClick={logout}>logout</button>
   <div className='header'>
     <h1>Student Productive Dashboard</h1>

    <div id="task-input-container">
      <input type="text" name="task" placeholder='add anew task...' id="task-input" onChange={(e) => setTaskInput(e.target.value)} />
      <input type="button" value="Add Task" id="add-task-btn" onClick={addTask}/>
    </div>

     <div className='filter-btn-container'>
        <button className={`filter-btn ${activeBtn === 'all' ? 'active' : ''}`} onClick={() => {
          setActiveBtn('all');
          filterTasks('all');
        }}>All</button>
        <button className={`filter-btn ${activeBtn === 'completed' ? 'active' : ''}`} onClick={() => {
          setActiveBtn('completed');
          filterTasks('completed');
        }}>Completed</button>
        <button className={`filter-btn ${activeBtn === 'pending' ? 'active' : ''}`} onClick={() => {
          setActiveBtn('pending');
          filterTasks('pending');
        }}>Pending</button>
     </div>

   </div>

   <div className='main-section'>
  <>
   { 
      
      filteredTasks.length > 0 ? (filteredTasks.map((task)=>(
          <div key={task._id} className="task">
            <input  className="task-checkbox" checked={task.status === 'completed'} type="checkbox" name={`task-${task._id}`} onClick={()=>{
              toggleTaskStatus(task._id);
            }}/>
            
            <p className={`${task.status === 'completed' ? 'completed' : ''}`}>{task.title}</p>
            <span className=" del  material-symbols-outlined" onClick={()=>{
              removeTask(task._id);
            }} > 
            
  delete
  </span>
          </div>
        ))): <p className='no-task'>No tasks available</p>
   }
  </>
   </div>
  
    <div className='summary'>
        <h5>Today's Summary:</h5>
        
        <div className='filter-summary'>
          <p>Tasks: {taskList.length} |</p>
          <p>Completed: {numberOfCompleted}  | </p>
         <p>Pending: {numberOfPending}</p>
        </div>       
      </div>
   
 
    
     </div>

  )
}
