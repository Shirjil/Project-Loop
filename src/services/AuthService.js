import axios from "axios";

const API_URL = "https://project-loop-backend-1.onrender.com/api/users";


export const loginUser = (data) => {
    return axios.post(`${API_URL}/login`, data);
};