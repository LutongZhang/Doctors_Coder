const express = require("express");
const config = require("./server/config/config");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./server/api/user-api");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");

var port = process.env.PORT || 5000;
mongoose.connect(config.db.uri, { useNewUrlParser: true });
//check db connection
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("database connect");
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Passport middleware
app.use(passport.initialize());
//Passport config
require("./server/config/passport")(passport);

//Router
app.use("/api/user", userRouter);

app.listen(port, function() {
  console.log("Node app starts at port ", port);
});
