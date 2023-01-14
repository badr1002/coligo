import axios from "axios";

const API_URL = "http://localhost:4201/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  }).then((response) => {
    return response.data.data;
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        localStorage.setItem("token", response.data.data.token);
      }
      return response.data.data.user;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.reload();
};

export {
  register,
  login,
  logout,
};