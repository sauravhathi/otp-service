const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  id: String,
  email: String,
  otp: Number,
  createdAt: Date,
});

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;