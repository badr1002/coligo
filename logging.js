
var expressWinston = require('express-winston');
const winston = require('winston');
// const { ElasticsearchTransport } = require('winston-elasticsearch');
require('winston-daily-rotate-file');
const path = require('path');
const os = require('os');
var config = require('./config/config');
const fs = require('fs');
let serviceName = require('./package.json').name;
let dir = path.join(__dirname, config.transportFile.path);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(`${path.join(__dirname, config.transportFile.path)}/${serviceName}.log`, '')
var transportFile = new winston.transports.DailyRotateFile({
  filename: `${path.join(__dirname, config.transportFile.path)}/${serviceName}.log`,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: `${config.transportFile.maxSize}`,
  maxFiles: `${config.transportFile.maxFiles}`
});
// transportFile.on('rotate',function(oldfileName,newfilename){
//   console.log(oldfileName);
//   console.log(newfilename);
// })

// const esTransportOpts = {
//   level: global.apm.logger.level,
//   clientOpts: { node: config.get('log').serverElastic },
//   index: global.apm._conf.serviceName
// };


// const esTransport = new ElasticsearchTransport(esTransportOpts);

var transportArr = []
// if (config.get('log').elasticLog == true) {
//   transportArr.push(esTransport)
// }
// else {
// }
transportArr.push(transportFile)
const logger = winston.createLogger({
  transports: transportArr,
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
  dumpExceptions: true,
  showStack: true,
  exitOnError: false,
  // statusLevels: myCustomLevels,
  dynamicMeta: function (req, res) {
    let ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);
    return {
      user: (req.user == undefined || req.user == "" ? "NA" : req.user.data),
      app: config.get('log').repository,
      ip: ipAddr,
      type: 'info',
      hostName: os.hostname(),
      execUser: os.userInfo().username
    };
  },
});


var errorlogger = winston.createLogger({
  transports: transportArr,
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
  dumpExceptions: true,
  showStack: true,
  exitOnError: false,
  // statusLevels: myCustomLevels,
  dynamicMeta: function (req, res) {
    let ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);
    return {
      user: (req.user == undefined || req.user == "" ? "NA" : req.user.data),
      app: config.get('log').repository,
      ip: ipAddr,
      type: 'error-handler',
      hostName: os.hostname(),
      execUser: os.userInfo().username
    };
  },
})

// Compulsory error handling
logger.on('error', (error) => {
  console.error('Error in logger caught', error);
});
// esTransport.on('error', (error) => {
//   console.error('Error in logger caught', error);
// });

const winstonErrorInstance = expressWinston.errorLogger({
  winstonInstance: errorlogger
});

const winstonLoggerInstance = expressWinston.logger({
  winstonInstance: logger
})


module.exports = {
  winstonLoggerInstance,
  winstonErrorInstance,

};