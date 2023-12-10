const express = require("express");
const { getMessages, createMessage } = require("../controllers/message_controller");
const verifyToken = require("../middleware/verify_token");
const router = express.Router();

router.use(verifyToken);
router.route("/")
    .get(getMessages)
    .post(createMessage);

module.exports = router;