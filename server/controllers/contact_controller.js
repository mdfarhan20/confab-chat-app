const User = require("../models/user_model");
const Room = require("../models/room_model");
const Contact = require("../models/contact_model");
const asyncHandler = require("express-async-handler");

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ userId: req.user.id }).populate('contact');
    res.status(200).json({ contacts });
});

const createContact = asyncHandler(async (req, res) => {
    const user = req.user;
    const contactId = req.body.contact;
    const contactUser = await User.findById(contactId);

    if (!(user || contactUser)) {
        res.status(400);
        throw new Error("User and Contact ID required");
    }

    const roomName = `${user.username}/${contactUser.username}`;
    const contactExists = await Room.findOne({ name: roomName });
    if (contactExists) {
        res.status(400);
        throw new Error("User is already a contact");
    }

    const room = await Room.create({ name: roomName });
    const contact = await Contact.create({ userId: user.id, roomId: room.id, contact: contactId });
    await Contact.create({ userId: contactUser.id, roomId: room.id, contact: user.id });

    await contact.populate("contact");

    res.status(201).json({ message: "Contact successfully added", contact });
});


module.exports = { getContacts, createContact };