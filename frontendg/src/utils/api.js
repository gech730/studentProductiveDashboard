const API = import.meta.env.VITE_AUT_URL;

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
