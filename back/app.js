var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require('http')
const { Server } = require('socket.io')
require('dotenv').config()
var app = express();

app.disable('x-powered-by')


const db = mongoose.connection;
mongoose.connect(process.env.DB_LINK);

db.on("connected", () => {
  console.log("db connected");
});

db.on("error", (error) => {
  if (error) {
    console.log(error);
  }
});

var indexRouter = require("./routes/index");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  },
  connectionStateRecovery: {}
})
app.use("/", indexRouter);

io.on('connection', (socket) => {
  console.log(' socket connect')
  socket.on('join', (room) => {
    console.log(io.engine.clientsCount)
    socket.join(room)
  })
  socket.on('disconnect', () => console.log('disconnect'))
})
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
  res.json({ err: err });
});

module.exports = { app, server };
