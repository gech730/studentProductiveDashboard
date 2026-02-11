import React ,{useEffect,useState} from 'react';
import { getTasks } from '../utils/api.js';
function Contact() {
  const [data,setData]=useState([])
  useEffect( ()=>{
    const fetchData=async ()=>{
    const res=await getTasks();
    if(res)
      setData(res);
     const b=data.length;
    console.log('data'+ res)
    }
   fetchData();
  },[])
  return (
    <div>
      <h1>Contact Page</h1>
      {
       data.map(d=>(
        <div key={d._id}>
          <p>{d.title}</p>
         <p>{d.status}</p>
        </div>
        
       ))
      }
     
      <p>Email: support@example.com</p>
    </div>
  );
}

export default Contact;
