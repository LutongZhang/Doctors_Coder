const express = require("express");
const mongoose = require("mongoose");
const Device = require("../models/device-model");

const Router = express.Router();

Router.get("/getDevices", (req, res) => {
  Device.find()
    .then(data => {
      res.json(data);
    })
    .catch(e => {
      res.status(400).json({ msg: e });
    });
});

Router.post("/addKey", (req, res) => {
  const device = req.body.device;
  let inputs = req.body.addKey;

  Device.findOne({ name: device })
    .exec()
    .then(val => {
      inputs = inputs.filter(a => {
        return !val.keywords.includes(a);
      });
      Device.updateOne(
        { name: device },
        { keywords: [...val.keywords, ...inputs] }
      )
        .exec()
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
  res.end();
});

module.exports = Router;
