const express = require("express");
const mongoose = require("mongoose");
const Device = require("../models/device-model");
const isEmpty = require("is-empty");
const jwtDecode = require("jwt-decode");
const User = require("../models/user-model");

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

Router.get("/getDeviceID", (req, res) => {
  if(isEmpty(req.body.name)){
    return res.status(400).json({ message: "no device name" });
  }

  const name = req.body.name;

  Device.findOne({ name }).then(device => {
    if(!device){
      return res.status(400).json({ message: "device not found" });
    }
    res.json(device.id);
  });
});

Router.post("/addDevice", (req, res) => {
  if (req.cookies.Bearer == null) {
    return res.status(400).json({ message: "no cookie" });
  }
  const Info = jwtDecode(req.cookies.Bearer);
  console.log("info:", Info);
  const id = Info.id;
  User.findById(id, (err, data) => {
    if (err) {
      return res.status(400).json({ message: "token useless" });
    }
    console.log(data);

    //Check if admin?
    if(data.role != 'admin'){
      return res.status(400).json({ message: "requires admin permission" });
    }

    //Verify device
    if(isEmpty(req.body.name)){
      return res.status(400).json({ message: "device name is required" });
    }
    if(isEmpty(req.body.keywords)){
      return res.status(400).json({ message: "keywords are required" });
    }
      //Check source

    //Create Device
    const newDevice = new Device({
      name: req.body.name,
      keywords: req.body.keywords,
      source: req.body.source, //?
    });

    //Save Device
    newDevice
          .save()
          .then(Devicex => {
            res.json(Devicex);
          })
          .catch(err => {
            console.log("err", err);
            let msg = "Device add failed";
            if(err.code === 11000){
              msg = "Device name is taken";
            }
            return res.status(400).json(msg);
          });
  });
});


Router.post("/deleteDevice", (req, res) => {
  if (req.cookies.Bearer == null) {
    return res.status(400).json({ message: "no cookie" });
  }
  const Info = jwtDecode(req.cookies.Bearer);
  console.log("info:", Info);
  const id = Info.id;
  User.findById(id, (err, data) => {
    if (err) {
      return res.status(400).json({ message: "token useless" });
    }
    console.log(data);

    //Check if admin?
    if(data.role != 'admin'){
      return res.status(400).json({ message: "requires admin permission" });
    }

    //Find and remove device
    if(isEmpty(req.body.id)){
      return res.status(400).json({ message: "id is required" });
    }
    Device.findByIdAndDelete(req.body.id, (err, device) => {
      if(err){
        return res.status(400).json({ message: "device not found" });
      }
      res.json(device);
    });
  });
});

module.exports = Router;
