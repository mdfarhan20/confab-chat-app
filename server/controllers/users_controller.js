const User = require("../models/user_model");
const asyncHandler = require("express-async-handler");

const getUsersBySearch = asyncHandler(async (req, res) => {
    const searchKey = req.query.username;
    if (!searchKey || searchKey === "")
        return res.status(200).json({ users: [] });

    const regex = new RegExp(`^${searchKey.toLowerCase()}`);
    let users = await User.find({ username: {$regex: regex} });
    users = users.map(user => { return { id: user.id, username: user.username, name: user.name } });
    if (users)
        return res.status(200).json({ users });
    res.sendStatus(404);
});

module.exports = { getUsersBySearch }