const announcementDal = require('../dal/announcement.dal')



module.exports = {
    allAnnouncements: (callback) => {
        if (!data) return callback("#1.1.1")
        announcementDal.allAnnouncements((err, result) => {
            if (err) return callback(err)
            else return callback(false, result)
        })
    },

   }