import axios from "axios";

const BASE_URL = "https://confab-subsurf.onrender.com";

export default axios.create({
    baseURL: BASE_URL
});

export const axiosSecure = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});