const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        isGroup: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Room", roomSchema);