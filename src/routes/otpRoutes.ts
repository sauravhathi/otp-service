import { Router } from 'express';
import OtpController from '../controllers/otpController';
import SendMailController from '../controllers/sendMailController';
import logger from '../utils/logger';
import { validateSpamMiddleware } from '../middleware';

const router = Router();
const otpController = new OtpController();
const sendMailController = new SendMailController();

/**
 * Route to generate OTP and send it via email
 */
router.post('/otp/generate', validateSpamMiddleware, async (req, res) => {
  try {
    const { email, type = 'numeric', organization = 'Saurav Hathi', subject = 'One-Time Password (OTP)' } = req.body;

    const otp = await otpController.generateOtp(email, type);
    await sendMailController.sendMail(email, otp, organization, subject)

    res.status(200).json({ message: 'OTP is generated and sent to your email' });
  } catch (error) {
    logger.error('Failed to generate OTP', (error as Error).message);
    res.status(400).json({ error: (error as Error).message });
  }
});

/**
 * Route to verify OTP
 */
router.post('/otp/verify', async (req, res) => {
  try {
    const { email, otp } = req.body;
    await otpController.verifyOtp(email, otp);

    res.status(200).json({ message: 'OTP is verified' });
  } catch (error) {
    logger.error('Failed to verify OTP', (error as Error).message);
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;