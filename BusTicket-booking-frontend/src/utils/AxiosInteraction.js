import axios from "axios"; 

export const REST_API_BASE_URL = "http://localhost:8081";

export const setAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};