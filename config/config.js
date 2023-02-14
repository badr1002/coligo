
module.exports = {
    
    db: {
        uri:"mongodb://localhost:27017/tridmark"
    },
    JWTKEY: "TRIDMARK_JWT",
    SESSION_SECRET: 'Bb123456+',
    transportFile: {
        path: 'logs',
        maxSize: '20m',
        maxFiles: '14d'
    },

}
