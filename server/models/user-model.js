const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  }
});

module.exports = mongoose.model("User", userModel);
