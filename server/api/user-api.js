const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const sendEmail = require("../mailer/emailFunctionality.js");
const jwtDecode = require("jwt-decode");
//User model
const User = require("../models/user-model");

//Input validation
const validateRegisterInput = require("../userValidation/register_validation");
const validateLoginInput = require("../userValidation/login_validation");

const Router = express.Router();
mongoose.connect(config.db.uri);


Router.get("/info", (req, res) => {
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
    res.json({
      userName: data.userName,
      email: data.email,
      role: data.role
    });
  });
});

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
          //console.log(Userxx);
          const payload = {
            id: Userxx._id
          };

          jwt.sign(
            payload,
            process.env.secretOrKey || config.secretOrKey,
            {
              expiresIn: 31556926
            },
            (err, token) => {
              res.cookie("Bearer", token);
              res.json({
                userName: Userxx.userName,
                role: Userxx.role
              });
              //eamil send
              sendEmail(req.body);
            }
          );
          // res.json({ userName: Userxx.userName });
          // //eamil send
          // sendEmail(req.body);
        })
        .catch(err => {
          console.log("err", err);
          let msg = "registration fail";
          //Object.getOwnPropertyNames(err.keyValue)[0];
          if (err.code === 11000) {
            msg =
              Object.getOwnPropertyNames(err.keyValue)[0] + " alreadly existed";
          }
          return res.status(400).json(msg);
        });
    });
  });
});

Router.post("/login", (req, res) => {
  console.log(req.body);
  const { errors, isValid } = validateLoginInput(req.body);
  console.log("login budy:", req.body);
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
          id: User.id
        };

        jwt.sign(
          payload,
          process.env.secretOrKey || config.secretOrKey,
          {
            expiresIn: 31556926
          },
          (err, token) => {
            res.cookie("Bearer", token);
            res.json({
              userName: User.userName,
              role: User.role
            });
          }
        );
      } else {
        return res.status(400).json("Password incorrect");
      }
    });
  });
});

Router.get("/userList", (req, res) => {
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

    User.find()
      .then(data => {
        let safeData = [];
        data.forEach(element => {
          const toAdd = {
            userName: element.userName,
            firstName: element.firstName,
            lastName: element.lastName,
            email: element.email
          };
          safeData.push(toAdd);
        });
        res.json(safeData);
      })
      .catch(e => {
        res.status(400).json({ message: e });
      });
  });
});

Router.post("/deleteUser", (req, res) => {
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
    const userName = req.body.userName;
    User.findOneAndDelete({ userName })
      .then(User => {
        res.json({
          userName: User.userName,
          firstName: User.firstName,
          lastName: User.lastName,
          email: User.email
        });
      })
      .catch(e => {
        res.status(400).json({ message: e });
      });
  });
});

module.exports = Router;
