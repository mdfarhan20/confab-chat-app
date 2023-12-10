const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
    {
        body: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: "User"
        },
        roomId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: "Room"
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Message", messageSchema);