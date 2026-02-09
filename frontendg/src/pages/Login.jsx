import React,{ useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../utils/api.js';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginRequest(email, password);

      localStorage.setItem("token", data.token);

      navigate("/products");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <>
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
    </>
  );
}

export default Login;
//

