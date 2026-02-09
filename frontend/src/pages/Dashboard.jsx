import { useEffect } from 'react';
import { getToken } from '../utils/auth.js';
const  autUrl=import.meta.env.VITE_AUT_URL;
function Dashboard() {
  useEffect(() => {
    fetch(`${autUrl}/dashboard`, {
      headers: {
        Authorization: getToken(),
      },
    })
      .then(res => res.text())
      .then(data => console.log(data));
  }, []);

  return <h1>Dashboard</h1>;
}

export default Dashboard;
