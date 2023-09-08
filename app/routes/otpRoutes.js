const express = require('express');
const otpController = require('../controllers/otpController');
const logger = require('../utils/logger');

const router = express.Router();

router.post('/otp', async (req, res) => {
  try {const { email, encryption } = req.body;

    const otp = await otpController.generateOtp(email);

    res.status(200).json({ otp });
  } catch (error) {
    logger.error('Failed to generate OTP', error.message);
    res.status(400).json({ error: error.message });
  }
});

router.post('/otp/verify', async (req, res) => {
  try {
    const { email, otp } = req.body;
    await otpController.verifyOtp(email, otp);

    res.status(200).json({ message: 'OTP is valid' });
  } catch (error) {
    logger.error('Failed to verify OTP', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;