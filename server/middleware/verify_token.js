const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!(authHeader && authHeader.startsWith("Bearer"))) {
        return res.sendStatus(401);
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "User not logged in.." });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token expired or invalid" });
        }

        req.user = user;
        next();
    });
};

module.exports = verifyToken;