const userDal = require('../dal/user.dal')
 


module.exports = {
    register: (data, callback) => {
        if (!data) return callback("#1.1.1")
        userDal.register(data, (err, result) => {
            if (err) return callback(err)
            else return callback(false, result)
        })
    },

    login: async (user, lang, callback) => {
        if (!user) return callback("#1.1.1");
        // set lang
        userDal.changeLang(user, lang, (err, _user) => {
            if (err) return callback(err);
            else {            
                delete _user.password;
                delete _user.tokens;
                userDal.generateToken(_user._id, (err, token) => {
                    if (err) return callback(err)
                    else return callback(null, { user: _user, token })
                })
            }
        })
    },

    changeLang: (user, lang, callback) => {
        userDal.changeLang(user, lang, (err, _user) => {
            if (err) return callback(err)
            else return callback(null, 'done')
        })
    },

    logout: (userId, token, callback) => {
        userDal.logout(userId, token, (err, result) => {
            if (err) return callback(err)
            else return callback(false, result)
        })
    },


}