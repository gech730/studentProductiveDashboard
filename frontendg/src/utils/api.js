const API = import.meta.env.VITE_AUT_URL;
const apiUrl=import.meta.env.VITE_API_URL;
export const getTasks=async()=>{
    try {
      const res= await fetch(`${apiUrl}/all`)
      if(!res.ok){
        throw new Error("Failed to fetch tasks")
      }
      const data=await res.json()
      console.log(data)
      return data;
    }catch(error){
        console.log(error)
    }
  }
export const loginRequest = async (email, password) => {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

export const fetchDashboard = async (token) => {
  const res = await fetch(`${API}/dashboard`, {
    headers: {
      Authorization: token,
    },
  });

  return res.text();
};
