const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db_connection");
const errorHandler = require("./middleware/error_handler");
const PORT = process.env.PORT || 8000;

connectDB();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

app.use("/user", require("./routes/user_route"));

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});

