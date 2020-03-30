const express = require("express");
const Device = require("../models/device-model");
const isEmpty = require("is-empty");
const jwtDecode = require("jwt-decode");
const User = require("../models/user-model");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const config = require("../config/config");

const Router = express.Router();
// mongoose.connect(config.db.uri);

//file upload middleware
Router.use(fileUpload());

Router.get("/getDevices", (req, res) => {
  Device.find()
    .then(data => {
      data = data.map(val => {
        obj = {};
        obj._id = val._id;
        obj.name = val.name;
        obj.keywords = val.keywords;
        obj.buffer = fs.readFileSync(
          path.resolve(__dirname, `../devices_images/${val.source}`)
        );

        return obj;
      });

      //console.log(data);
      res.send(data);
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

Router.get("/getDeviceID", (req, res) => {
  if (isEmpty(req.body.name)) {
    return res.status(400).json({ message: "no device name" });
  }

  const name = req.body.name;

  Device.findOne({ name }).then(device => {
    if (!device) {
      return res.status(400).json({ message: "device not found" });
    }
    res.json(device.id);
  });
  res.end();
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
    if (data.role != "admin") {
      return res.status(400).json({ message: "requires admin permission" });
    }

    //Verify device
    if (isEmpty(req.body.name)) {
      return res.status(400).json({ message: "device name is required" });
    }
    if (isEmpty(req.body.keywords)) {
      return res.status(400).json({ message: "keywords are required" });
    }
    //save images
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    const file = req.files.file;
    console.log(file);
    console.log(req.body);
    file.mv(`${__dirname}/../devices_images/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });
    //Create Device
    const newDevice = new Device({
      name: req.body.name,
      keywords: req.body.keywords,
      source: file.name //?
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
        if (err.code === 11000) {
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
    if (data.role != "admin") {
      return res.status(400).json({ message: "requires admin permission" });
    }

    //Find and remove device

    if (isEmpty(req.body.deviceId)) {
      return res.status(400).json({ message: "id is required" });
    }

    console.log("deviceID:", req.body.deviceId);

    Device.findByIdAndDelete(req.body.deviceId, (err, device) => {
      if (err) {
        return res.status(400).json({ message: "device not found" });
      }
      res.json(device);
    });
  });
});

module.exports = Router;
