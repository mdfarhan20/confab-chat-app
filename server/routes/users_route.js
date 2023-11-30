const express = require("express");
const verifyToken = require("../middleware/verify_token");
const { getUsersBySearch } = require("../controllers/users_controller");

const router = express.Router();

router.use(verifyToken);
router.get("/search", getUsersBySearch);

module.exports = router;
