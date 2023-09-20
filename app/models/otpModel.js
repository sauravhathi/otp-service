const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  id: String,
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;