const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        res.status(401).json({ message: "User not logged in.." });
        return;
    }

    jwt.verify(token, process.env.ACCESS_KEY, (err, user) => {
        req.user = user;
        next();
    });
};

module.exports = verifyToken;