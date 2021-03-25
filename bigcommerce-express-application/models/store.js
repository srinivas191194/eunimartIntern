const mongoose = require("mongoose");
const { Schema } = mongoose;

const store = new Schema({
  storeHash: String,
  accessToken: String,
  userid: Number,
  userName: String,
  useremail: String,
});

module.exports = mongoose.model("storetoken", store);
