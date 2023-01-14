const announcementModel = require('../../db/models/announcement.model');

class Announcement {

    static allAnnouncements = async (callback) => {
        try {
            let announcements = await announcementModel.find();
            callback(false, announcements)
        } catch (err) {
            callback(err)
        }
    }


}

module.exports = Announcement;
