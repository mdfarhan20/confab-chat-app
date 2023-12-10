const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: "User"
        },
        roomId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: "Room"
        },
        contact: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Contact", contactSchema);