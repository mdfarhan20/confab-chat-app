const express = require("express");
const { registerUser, loginUser, logoutUser, refreshUser } = require("../controllers/auth_controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshUser);
router.delete("/logout", logoutUser);

module.exports = router;