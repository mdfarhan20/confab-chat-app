const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Message = require("../models/message_model");
const Room = require("../models/room_model");

const getMessages = asyncHandler(async (req, res) => {
    const roomId = req.body.roomId;
    if (!roomId) {
        res.status(400);
        throw new Error("Room id required");
    }

    const room = await Room.findById(roomId);
    if (!room) {
        res.status(404);
        throw new Error("Room does not exist");
    }

    const messages = await Message.find({ roomId });
    console.log(messages);
    res.status(200).json({ messages });
});

const createMessage = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { body, roomId } = req.body;

    if (!body || !roomId) {
        res.status(400);
        throw new Error("Invalid Request");
    }

    const room = await Room.findById(roomId);
    if (!room) {
        res.status(404);
        throw new Error("Room does not exist");
    }

    await Message.create({ body, userId, roomId });
    res.status(201).json({ message: "Message created" });
});

module.exports = { getMessages, createMessage };