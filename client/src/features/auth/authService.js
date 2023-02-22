import axios from "axios";

const API_URL = "/api/auth/";
const SERVER_URL = "http://localhost:5000";

const register = async (user) => {
  const res = await axios.post(SERVER_URL + API_URL + "register", user);

  console.log(res);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const login = (user) => {
  const res = axios.post(API_URL + "login", user);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const authService = { login, register };
export default authService;
