const express = require("express");
const User = require("../models/user-model");

const Router = express.Router();

Router.post("/register", (req, res) => {
  console.log("register post");
  const userInfo = req.body;
  const user = new User({
    userName: userInfo.userName,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    password: userInfo.password
  });
  user.save((err, doc) => {
    if (err) {
      console.log("err", err);
      let msg = "registration fail";
      if (err.code === 11000) {
        msg = "username alreadly existed";
      }
      res.json({
        code: 1,
        msg: msg
      });
      return err;
    } else {
      const { _id } = doc;
      res.cookie("userId", _id);
      res.json({
        code: 1,
        data: {
          userName: userInfo.userName,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          password: userInfo.password
        }
      });
    }
  });
});

module.exports = Router;
