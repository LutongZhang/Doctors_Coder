const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

//User model
const User = require("../models/user-model");

//Input validation
const validateRegisterInput = require("../config/register_validation");
const validateLoginInput = require("../config/login_validation");

const Router = express.Router();
mongoose.connect(config.db.uri);

Router.post("/Register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ userName: req.body.userName }).then(Userx => {
    if (Userx) {
      return res.status(400).json({ userName: "Username already exists" });
    }
    else {
      User.findOne({ email: req.body.email }).then(Userxx => {
        if (Userxx) {
          return res.status(400).json({ email: "Email already exists" });
        }
        else {
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
                .then(Userxx => res.json(Userxx))
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });
});


Router.post("/Login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  const userName = req.body.userName;
  const password = req.body.password;

  //find user by username
  User.findOne({ userName }).then(User => {
    if(!User){
      return res.status(404).json({ usernamenotfound: "Username not found"});
    }

    bcrypt.compare(password, User.password).then(isMatch => {
      if(isMatch){
        const payload = {
          id: User.id,
          name: User.userName
        }

        jwt.sign(
          payload,
          config.secretOrKey,
          {
            expiresIn: 31556926
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
          return res 
            .status(400)
            .json({ passwordincorrect: "Password incorrect" }); 
      }
    });
  });
});

module.exports = Router;