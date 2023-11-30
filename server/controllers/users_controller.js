const User = require("../models/user_model");
const asyncHandler = require("express-async-handler");

const getUsersBySearch = asyncHandler(async (req, res) => {
    const searchKey = req.query.username;
    if (!searchKey || searchKey === "")
        return res.status(400).json({ message: "No Search Key found" });

    const users = await User.find({ username: `${searchKey}` });
    if (users)
        return res.status(200).json({ users });
    res.sendStatus(404);
});

module.exports = { getUsersBySearch }