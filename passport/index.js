const session = require('express-session');
const cookieparser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-bearer-strategy').Strategy;
const flash = require('connect-flash');
const userModel = require('../db/models/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('../config/config')
const { returnError, returnSuccess } = require('../helpers/handleRequests')

checkUser = async (token, decodedToken) => {
    try {
        let user = userModel.findOne({
            _id: decodedToken._id,
            //  activate: true,
            'tokens.token': token,
        })
        return user
    } catch (err) {
        throw new Error(err)
    }
}

// export a function that receives the Express app we will configure for Passport
module.exports = (app) => {
    // these two middlewares are required to make passport work with sessions
    // sessions are optional, but an easy solution to keeping users
    // logged in until they log out.
    app.use(cookieparser());
    app.use(session({
        // this should be changed to something cryptographically secure for production
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        // automatically extends the session age on each request. useful if you want
        // the user's activity to extend their session. If you want an absolute session
        // expiration, set to false
        rolling: true,
        name: 'sid', // don't use the default session cookie name
        // set your options for the session cookie
        cookie: {
            httpOnly: true,
            // the duration in milliseconds that the cookie is valid
            maxAge: 20 * 60 * 1000, // 20 minutes
            // recommended you use this setting in production if you have a well-known domain you want to restrict the cookies to.
            // domain: 'your.domain.com',
            // recommended you use this setting in production if your site is published using HTTPS
            // secure: true,
        }
    }));
    // you don't need to use the flash middleware. however, in this example,
    // we're using it so we can show any authentication error messages in our login form.
    app.use(flash());



    // this tells passport to use the "local" strategy, and configures the strategy
    // with a function that will be called when the user tries to authenticate with
    // a username and password. We simply look the user up, hash the password they
    // provided with the salt from the real password, and compare the results. if
    // the original and current hashes are the same, the user entered the correct password.
    passport.use(new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
        const user = await userModel.findOne({ email: username });
        if (!user)
            return done('#1.1.4', false, { message: '#1.1.4' });
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid)
            return done('#1.1.5', false, { message: '#1.1.5' });
        return done(null, user)

    }));

    passport.use(new BearerStrategy(
        async function (token, done) {
            try {
                //we attempt to validate the token the client sent with the request
                //let token = req.headers.authorization.replace('bearer ', '')
                let decodedToken = jwt.verify(token, config.JWTKEY)
                // check user    
                let user = await checkUser(token, decodedToken)
                if (!user) return done(null, false);
                return done(null, user);
            }
            catch (err) {
                return done(null, false); //returns a 401 to the caller
            }
        }
    ));

    // Only necessary when using sessions.
    // This tells Passport how or what data to save about a user in the session cookie.
    // It's recommended you only serialize something like a unique username or user ID.
    // I prefer user ID.
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    // Only necessary when using sessions.
    // This tells Passport how to turn the user ID we serialize in the session cookie
    // back into the actual User record from our Mongo database.
    // Here, we simply find the user with the matching ID and return that.
    // This will cause the User record to be available on each authenticated request via the req.user property.
    passport.deserializeUser(function (userId, done) {
        userModel.findById(userId)
            .then(function (user) {
                done(null, user);
            })
            .catch(function (err) {
                done(err);
            });
    });

    // initialize passport. this is required, after you set up passport but BEFORE you use passport.session (if using)
    app.use(passport.initialize());
    // only required if using sessions. this will add middleware from passport
    // that will serialize/deserialize the user from the session cookie and add
    // them to req.user
    app.use(passport.session());
}