const express = require('express');
const router = express.Router();
var passport = require('passport');
const userBll = require('../core/bll/user.bll')
const { returnError, returnSuccess } = require('../helpers/handleRequests')

router.post('/register', (req, res) => {
    userBll.register(req.body, (err, result) => {
        if (err) returnError(res, err, 400)
        else returnSuccess(res, result)
    })
})


router.post('/login', (req, res) => {
    passport.authenticate('local', { failureFlash: true, session: false }, async (err, user, done) => {
        if (err) return returnError(res, err, 400)
        else {
            let userInfo = user.toObject()
            await userBll.login(userInfo, req.query.lang, (err, result) => {
                if (err) returnError(res, err, 400)
                else returnSuccess(res, result)
            })
        }
    })(req, res)
})


router.get('/me', passport.authenticate('bearer', { session: false }), (req, res) => {
    if (req.user) {
        let user = req.user.toObject();
        delete user.password
        delete user.tokens
        returnSuccess(res, { user })
    } else returnError(res, "#1.1.10")
});

router.get('/changeLang', passport.authenticate('bearer', { session: false }), (req, res) => {
    userBll.changeLang(req.user, req.query.lang, (err, result) => {
        if (err) returnError(res, err, 400)
        else returnSuccess(res, result)
    })
})

router.delete('/logout', passport.authenticate('bearer', { session: false }), (req, res) => {
    userBll.logout(req.user._id, req.headers.authorization, (err, result) => {
        if (err) returnError(res, err, 400)
        else returnSuccess(res, result)
    })
});


module.exports = router;