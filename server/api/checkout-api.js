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
  console.log("suss")
   Checkout1.findOneAndUpdate({ _id: req.body.checkedOut._id},{checkinTime:req.body.checkedOut.checkinTime} ,function(err, found) {
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
