export const getToken = () => localStorage.getItem("token");

export const isLoggedIn = () => !!getToken();

export const login = () => {
  localStorage.setItem("token", "demo-token");
};

export const logout = () => {
  localStorage.removeItem("token");
};
