
import TaskInput from './components/TaskInput.jsx';
import Login from './components/Login.jsx'
 import { isLoggedIn } from "./utils/auth.js";
import './css/task.css'
export default function App() {
  

function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <h2>Please login first</h2>;
  }

  return children;
}

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
