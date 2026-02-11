import React,{ useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../utils/api.js';
import '../css/navbar.css'
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginRequest(email, password);

      localStorage.setItem("token", data.token);

      navigate("/program");
    } catch (err) {
      alert("Login failed");
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
      </div>
      
    </div>
  );
}

export default Login;
//

