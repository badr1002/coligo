const mongoose = require("mongoose");
const config = require('../config/config')

let connectionDb = []

module.exports = {
  reConnectMongoose: () => {
    try {
      if (connectionDb.length > 0) return callback(connectionDb[0].db)
      else {
        mongoose.connect(config.db.uri, {
          useNewUrlParser: true, useUnifiedTopology: true, retryWrites: true
        }).then(db => {
          connectionDb.push({ db })
          console.log('Database ' + db.connections[0].name + ' connected successfully');
        })
      }
    } catch (err) {
      console.log("Database invalid connection!");
      setTimeout(() => {
        module.exports.reConnectMongoose();
      }, 5000);
    }
  }
}