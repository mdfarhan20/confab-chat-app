const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db_connection");
const errorHandler = require("./middleware/error_handler");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 8000;

connectDB();
const app = express();

const corsOptions = {
    origin: [
        "https://mdfarhan20.github.io",
        "http://localhost:5173",
        "https://fuzzy-guacamole-459qqwx69x9h7pjx-5173.app.github.dev"
    ],
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", require("./routes/auth_route"));
app.use("/users", require("./routes/users_route"));
app.use("/contact", require("./routes/contact_route"));
app.use("/message", require("./routes/message_route"));
app.use(errorHandler);

const server = app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});


const io = new Server(server, {
    cors: {
        origin: [
            "https://mdfarhan20.github.io",
            "http://localhost:5173",
            "https://fuzzy-guacamole-459qqwx69x9h7pjx-5173.app.github.dev"
        ]
    }
});

io.on("connection", (socket) => {
    console.log(`Socket connected with ID: ${socket.id}`);
    
    socket.on("connected", (id) => {
        socket.join(id);
    })

    socket.on("contact-change", (room, id) => {
        const rooms = [...socket.rooms];
        rooms.forEach(room => socket.leave(room));
        socket.join(room);
        socket.join(id);
        console.log("Room Joined", room);
    });

    socket.on("added-contact", (contactId) => {
        io.to(contactId).emit("added-contact");
    })

    socket.on("send-message", (message) => {
        console.log("Recieved Message: ", message.body);
        io.to(message.roomId).emit("recieve-message", message);
    });

    socket.on("disconnecting", () => {
        console.log("Socket disconnecting");
    });
});
