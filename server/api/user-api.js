const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

//User model
const User = require("../models/user-model");

//Input validation
const validateRegisterInput = require("../userValidation/register_validation");
const validateLoginInput = require("../userValidation/login_validation");

const Router = express.Router();
mongoose.connect(config.db.uri);

Router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  console.log(errors);
  if (!isValid) {
    return res.status(400).json("registration failed");
  }
  const newUser = new User({
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });

  //Hash password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(Userxx => {
          res.json(Userxx);
        })
        .catch(err => {
          console.log("err", err);
          let msg = "registration fail";
          if (err.code === 11000) {
            msg = "username or Email alreadly existed";
          }
          return res.status(400).json(msg);
        });
    });
  });
});

Router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json("please fill required data");
  }

  const userName = req.body.userName;
  const password = req.body.password;

  //find user by username
  User.findOne({ userName }).then(User => {
    if (!User) {
      return res.status(401).json("Username not found");
    }

    bcrypt.compare(password, User.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: User.id,
          name: User.userName
        };

        jwt.sign(
          payload,
          config.secretOrKey,
          {
            expiresIn: 31556926
          },
          (err, token) => {
            res.cookie("Bearer", token);
            res.json({
              userName: User.userName
            });
          }
        );
      } else {
        return res.status(400).json("Password incorrect");
      }
    });
  });
});

module.exports = Router;
