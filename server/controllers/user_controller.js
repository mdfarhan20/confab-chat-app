const Users = require("../models/user_model");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userValidationSchema = {
    name: Joi.string().min(2).max(30).required(),
    username: Joi.string().min(5).max(30).required(),
    password: Joi.string().min(5).max(30).required()
}

const registerUser = asyncHandler(async (req, res) => {
    const { name, username, password } = req.body;
    const { error } = Joi.validate(req.body, userVlidationSchema);

    if (error) {
        res.sendStatus(400);
        throw new Error(error.details[0].message);
    }

    const userExists = await Users.findOne({ username });
    if (userExists) {
        res.sendStatus(400);
        throw new Error("User already exists!!");
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await Users.create({ name, username, password: hashedPassword });

    if (!user) {
        res.sendStatus(400);
        throw new Error("Invalid Data");
    }

    res.status(201).json({ message: "Sign in successful" });
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.sendStatus(400);
        throw new Error("All fields are mandatory!!");
    }

    const user = await Users.findOne({ username });
    if (!user) {
        res.sendStatus(404);
        throw new Error("User does not exist");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({ user: {
            id: user.id, 
            name: user.name, 
            username: user.username 
        }}, process.env.ACCESS_KEY, { expiresIn: "2m" });

        res.cookie("jwt", accessToken, { httpOnly: true });
        res.json({ message: "Login Successful" });
    } else {
        res.sendStatus(400);
        throw new Error("Username or Password invalid");
    }
});

module.exports = { registerUser, loginUser };