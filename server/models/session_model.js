const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            unique: true,
            ref: "User"
        },
        token: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Session", sessionSchema);