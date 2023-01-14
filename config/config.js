
module.exports = {
    
    db: {
        uri: 'mongodb+srv://badr1002:og0vQafkZNaxwh4W@cluster0.jmhw5wr.mongodb.net/Coligo', 
        // uri:"mongodb://localhost:27017/tridmark"
    },
    JWTKEY: "TRIDMARK_JWT",
    SESSION_SECRET: 'Bb123456+',
    transportFile: {
        path: 'logs',
        maxSize: '20m',
        maxFiles: '14d'
    },

}