const express = require("express");
const verifyToken = require("../middleware/verify_token");
const { getContacts, createContact } = require("../controllers/contact_controller");

const router = express.Router();

router.use(verifyToken);

router.route("/").get(getContacts).post(createContact);

module.exports = router;