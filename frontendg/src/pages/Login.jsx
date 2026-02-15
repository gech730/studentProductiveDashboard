import React,{ useState }  from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { loginRequest } from '../utils/api.js';
import '../css/navbar.css'
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginRequest(email, password);
        if(!data.token){
           alert(data.message);
           return;
        }
      localStorage.setItem("token", data.token);
      if(email==="admin@gmail.com" && password === "Admin123")
        navigate("/admin");
      else
      navigate("/program");
    
    } catch (err) {
      alert("Login failed",err);
    }
  };

  return (
    <div className='login-page-container'>
      <div className='input-area'>
      <h1>Login</h1>

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Login
      </button>
      <p className="mono" >if you have not account {"  "}<Link to="/register">Register</Link></p>
      <p className="mono"><Link to="/">forget password</Link></p>
        
      </div>
      
    </div>
  );
}

export default Login;
//

