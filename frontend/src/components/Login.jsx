import { useState } from "react";
const  autUrl=import.meta.env.VITE_AUT_URL;
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const login = async () => {

     fetch(`${autUrl}/dashboard`, {
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

    const res = await fetch(`${autUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    localStorage.setItem("token", data.token);
    alert("Logged in!");
  };
   const register = async () => {

//      fetch(`${autUrl}/dashboard`, {
//   headers: {
//     Authorization: localStorage.getItem("token"),
//   },
// });

    const res = await fetch(`${autUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name, email, password }),
    });

    const data = await res.json();

    localStorage.setItem("name", data);
    alert("sign up!");
  };



  return (
    <>
      <input style={{display:"block", color: "black", fontSize: "30px", border:"none",backgroundColor:"white" ,margin:"5px"}} 
      onChange={e => setEmail(e.target.value)} placeholder="Email" />

      <input style={{display:"block", color: "black", fontSize: "30px",border:"none",margin:"5px"}}
       type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
<>
      <button style={{  color: "white", fontSize: "30px", backgroundColor: "green" ,padding:"5px",border:"none",margin:"10px"}}
       onClick={login}>Login</button>
     <button style={{  color: "white", fontSize: "30px", backgroundColor: "green" ,padding:"5px",border:"none",margin:"10px"}}
       onClick={register}>sign up</button>
    </>
    </>
  );
}

export default Login;
