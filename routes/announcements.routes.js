const express = require('express');
const router = express.Router();
const announcementsBll = require('../core/bll/announcement.bll')
const { returnError, returnSuccess } = require('../helpers/handleRequests')

router.get('/allAnnouncements', (req, res) => {
    announcementsBll.allAnnouncements((err, result) => {
        if (err) returnError(res, err, 400)
        else returnSuccess(res, result)
    })
})



module.exports = router;