import axios from "axios";

const BASE_URL = "https://fuzzy-guacamole-459qqwx69x9h7pjx-3000.app.github.dev";

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