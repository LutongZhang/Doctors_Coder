const Checkout1 = require("../models/checkout-model");
const express = require("express");
const Router = express.Router();

Router.post("/checkout", (req, res) => {
  const newCheckout = new Checkout1({
    userName: req.body.userName,
    device: req.body.device,
    checkoutTime: req.body.checkoutTime,
    checkinTime: req.body.checkinTime
  });
  newCheckout.save().then(Checkout1 => {
  });
  res.end("success");
});

Router.post("/getUserCheckout", (req, res) => {
  Checkout1.find({ userName: req.body.userName }, function(err, checkout) {
    if (err) res.end("error");
    else {
      res.json(checkout);
      res.end();
    }
  });
});

Router.post("/checkIn", (req, res) => {
  var date = new Date();
  var hours = date.getHours()>=13?date.getHours()-12:date.getHours();
  var ampm = date.getHours() >= 12 ? "PM" : "AM";
  var min =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  date =
    date.getMonth() +
    1 +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear() +
    " " +
    hours +
    ":" +
    min + " "
	+ ampm;
   Checkout1.findOneAndUpdate({ _id: req.body.checkedOut._id},{checkinTime:date} ,function(err, found) {
    if (err) {
	res.end("error");}
    else {
		// found.checkinTime = date;
    // found.save();
    res.send("checkin time update")
    }
  });
});

module.exports = Router;
