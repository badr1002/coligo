var createError = require("http-errors");
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
var express = require("express");
var app = express();
require('./passport/index')(app);
const helmet = require("helmet");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const core = require("cors");
app.use(core());
var { winstonLoggerInstance, winstonErrorInstance } = require('./logging');

require("./db/connection").reConnectMongoose()
app.use(winstonLoggerInstance);
app.use(helmet.hidePoweredBy({
  setTo:
    'Love and other drugs'
}));
 
const userRoutes = require('./routes/users.routes');
const assignmentRoutes = require('./routes/assignment.routes');
 

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
})

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", express.static(path.resolve(__dirname, "client/dist")));
app.use('/api/auth', userRoutes);
app.use('/api/words', assignmentRoutes);

app.use(winstonErrorInstance);

// app.get('/*', function (req, res) {
//   res.sendFile(path.resolve(__dirname, 'client/dist', 'index.html'));
// })
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(500).json({
    message: err.message,
    error: err
  });
});

module.exports = app;
