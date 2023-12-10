const express = require("express");
const verifytoken = require("../middleware/verify_token");
const { registerUser, loginUser, logoutUser, refreshUser } = require("../controllers/auth_controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshUser);
router.put("/logout", verifytoken, logoutUser);

module.exports = router;