const express = require("express");
const config = require("./server/config/config");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./server/api/user-api");
const deviceRouter = require("./server/api/device-api");
const checkoutRouter = require("./server/api/checkout-api");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const path = require("path");
const hbs = require("hbs");

var port = process.env.PORT || 5000;
mongoose.connect(process.env.DB_URI || config.db.uri, {
  useNewUrlParser: true
});
//check db connection
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.set("view engine", "html");
app.engine("html", hbs.__express);
app.use(cookieParser());
app.use(bodyParser.json());
console.log(path.resolve(__dirname, "build"));
app.use("/", express.static(path.resolve(__dirname, "build")));
// app.use((req, res, next) => {
//   if (req.url.startsWith("/api/")) {
//     return next();
//   }
//   return res.sendFile(path.resolve(__dirname, "build/index.html"));
// });

app.get("*", function(req, res, next) {
  console.log("url", req.url);
  if (req.url.startsWith("/api")) {
    return next();
  }
  const index = path.join(__dirname, "build", "index.html");
  console.log(index);
  res.sendFile(index);
});

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
require("./server/userValidation/passport")(passport);

//Router
app.use("/api/user", userRouter);
app.use("/api/devices", deviceRouter);
app.use("/api/checkout", checkoutRouter);

app.listen(port, function() {
  console.log("Node app starts at port ", port);
});
