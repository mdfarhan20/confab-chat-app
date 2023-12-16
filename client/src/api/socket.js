import { io } from "socket.io-client";

const socket = io("https://confab-subsurf.onrender.com");

export default socket;