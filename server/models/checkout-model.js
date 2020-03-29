const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema({

  userName: {
    type: String,
    required: true,
	unique: false
  },
  device: {
    type: String,
    required: true
  },
  
  checkoutTime: {
    type: String,
    required: true
  },
  checkinTime: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Checkout1", userModel);
