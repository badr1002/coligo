const userModel = require('../../db/models/user.model');

class User {

    static generateToken = async (userId, callback) => {
        try {
            let user = await userModel.findById(userId)
            let token = await user.generateToken();
            callback(false, token)
        } catch (err) {
            callback(err)
        }
    }

    static register = async (data, callback) => {
        try {
            const checkEmail = await userModel.findOne({ email: data.email });
            if (checkEmail) return callback('#1.1.2');
            // const checkMobile = await userModel.findOne({ mobile: data.mobile });
            // if (checkMobile) return callback('#1.1.3');
            const user = new userModel(data);
            await user.save();
            return callback(false, data)
        }
        catch (err) {
            return callback(err)
        }
    }

    static logout = async (userId, token, callback) => {
        try {
            const user = await userModel.findById(userId)
            if (!user) return callback('#1.1.7')
            user.tokens.splice(token.replace('bearer ', ''), 1)
            await user.save();
            return callback(false, 'done')
        }
        catch (err) {
            return callback(err)
        }
    }

    static changeLang = async (_user, lang, callback) => {
        if (!_user) return callback('#1.1.1');
        try {
            const user = await userModel.findById(_user._id)
            user.lastLogin = Date.now()
            user.lang = lang || 'ar'
            await user.save()
            return callback(false, user)
        } catch (err) {
            return callback(err)
        }
    }


}

module.exports = User;
