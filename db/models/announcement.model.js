const mongoose = require("mongoose");


const announcementSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        title: {
            type: String,
            trim: true,
        },
        message: {
            type: String,
            trim: true,
        },

        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date, default: Date.now() },
    },
    { timestamp: true }
);




const Announcement = mongoose.model("Announcements", announcementSchema, "Announcements");
module.exports = Announcement;
