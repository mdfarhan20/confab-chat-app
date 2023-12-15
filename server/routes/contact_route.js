const express = require("express");
const verifyToken = require("../middleware/verify_token");
const { getContacts, createContact, createGroup } = require("../controllers/contact_controller");

const router = express.Router();

router.use(verifyToken);

router.route("/").get(getContacts).post(createContact);
router.post("/group", createGroup);

module.exports = router;