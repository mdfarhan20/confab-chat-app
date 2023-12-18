const User = require("../models/user_model");
const Session = require("../models/session_model");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userValidationSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    username: Joi.string().alphanum().min(5).max(30).required(),
    password: Joi.string().min(5).max(30).required()
});

const registerUser = asyncHandler(async (req, res) => {
    let { name, username, password } = req.body;
    const { error } = userValidationSchema.validate(req.body);

    if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
    }

    username = username.toLowerCase();
    const userExists = await User.findOne({ username });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists!!");
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, username, password: hashedPassword });

    if (!user) {
        res.status(400);
        throw new Error("Invalid Data");
    }

    const session = await Session.create({ userId: user.id, token: null });
    res.status(201).json({ message: "Sign in successful" });
});

const loginUser = asyncHandler(async (req, res) => {
    let { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    username = username.toLowerCase()
    const user = await User.findOne({ username });
    if (!user) {
        res.status(404);
        throw new Error("User does not exist");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = getAccessToken(user);
        const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_KEY);
        // await Session.create({ userId: user.id, token: refreshToken });
        await Session.findOneAndUpdate({ userId: user.id }, { token: refreshToken });

        const userData = {
            id: user.id,
            name: user.name,
            username: user.username,
            accessToken: accessToken
        };

        res.json({ message: "Login Successful", user: userData });
    } else {
        res.status(400);
        throw new Error("Username or Password invalid");
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
        res.status(400);
        throw new Error("No user id provided");
    }

    const session = await Session.findOneAndUpdate({ userId }, { token: null });
    res.status(200).json({ message: "Logout Succesful" })
});


const refreshUser = asyncHandler(async (req, res) => {
    const userId = req.body.id;
    if (!userId) {
        res.status(400);
        throw new Error("No user id provided");
    }

    const session = await Session.findOne({ userId });
    const user = User.findById(userId);

    if (!user) {
        res.status(404);
        throw new Error("User does not exist");
    }

    if (session && (await jwt.verify(session.token, process.env.REFRESH_TOKEN_KEY))) {
        const accessToken = getAccessToken(user);
        res.status(201).json({ message: "Refresh Successful", accessToken });
    } else {
        res.status(403);
        throw new Error("Token expired or Invalid");
    }
});


function getAccessToken(user) {
    return jwt.sign({
        id: user.id, 
        name: user.name, 
        username: user.username 
    }, process.env.ACCESS_TOKEN_KEY, { expiresIn: "1m" });
}

module.exports = { registerUser, loginUser, logoutUser, refreshUser };