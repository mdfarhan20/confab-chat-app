import { io } from "socket.io-client";

const socketURL = "https://confab-subsurf.onrender.com";
// const socketURL = "http://localhost:3000";

const socket = io(socketURL);

export default socket;