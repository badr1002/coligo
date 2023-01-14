
module.exports = {

    db: {
        uri: "mongodb://localhost:27017/Coligo"
    },
    JWTKEY: "TRIDMARK_JWT",
    SESSION_SECRET: 'Bb12scddcsc3456+',
    transportFile: {
        path: 'logs',
        maxSize: '20m',
        maxFiles: '14d'
    },

}