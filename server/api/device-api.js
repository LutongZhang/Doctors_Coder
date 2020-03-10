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

module.exports = Router;
