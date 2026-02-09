
import TaskInput from './components/TaskInput.jsx';
import Login from './components/Login.jsx'
import './css/task.css'
export default function App() {
   const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

  return (
 <>  {
  !isAuthenticated() ?
  (
     <Login/>
  )
  :(
     <TaskInput />
  )
 }
 </> 
   
  )
}
