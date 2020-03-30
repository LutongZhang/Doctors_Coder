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
  console.log(newCheckout);
  newCheckout.save().then(Checkout1 => {
    console.log("success");
  });
  res.end("success");
});

Router.post("/getUserCheckout", (req, res) => {
  console.log(req.body.userName);
  Checkout1.find({ userName: req.body.userName }, function(err, checkout) {
    if (err) res.end("error");
    else {
      res.json(checkout);
      res.end();
    }
  });
});

module.exports = Router;
