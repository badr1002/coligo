import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:4201/api/test/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const getUserBoard = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
    return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

export  {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
};