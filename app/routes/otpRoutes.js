const express = require('express');
const otpController = require('../controllers/otpController');
const sendMailController = require('../controllers/sendMailController');
const logger = require('../utils/logger');

const router = express.Router();

router.post('/otp/generate', async (req, res) => {
  try {
    const { email, type = 'numeric', organization = 'Saurav Hathi', subject = 'One-Time Password (OTP)' } = req.body;

    const otp = await otpController.generateOtp(email, type);

    await sendMailController(email, otp, organization, subject);

    res.status(200).json({ message: 'OTP is generated and sent to your email' });
  } catch (error) {
    logger.error('Failed to generate OTP', error.message);
    res.status(400).json({ error: error.message });
  }
});

router.post('/otp/verify', async (req, res) => {
  try {
    const { email, otp } = req.body;
    await otpController.verifyOtp(email, otp);

    res.status(200).json({ message: 'OTP is verified' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
