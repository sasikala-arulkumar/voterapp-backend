const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  sno: String,
  voterName: String,
  familyHead: String,
  wifeName: String,
  age: Number,
  gender: String,
  disability: String,
  aadhaarNumber: String,
  phoneNumber: String,
  maritalStatus: String,
  work: String,
  area: String,
  address: String,
  voterId: String,
  rationCardNo: String,
  photo: String
}, { timestamps: true });

module.exports = mongoose.model("Voter", voterSchema);
