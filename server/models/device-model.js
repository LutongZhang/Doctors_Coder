const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deviceModel = new Schema({
  name: {
    type: String,
    required: true
  },
  keywords: [{
    type: String,
	required: true
  }],
  source: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Device", deviceModel);
