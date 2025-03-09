import Otp from '../models/otpModel';
import generateOTP from '../utils/generateOTP';
import logger from '../utils/logger';
import { Types } from 'mongoose';

const validityPeriodMs = parseInt(process.env.OTP_VALIDITY_PERIOD_MINUTES || '5') * 60 * 1000;
const OTP_SIZE = parseInt(process.env.OTP_SIZE || '6');
const MAX_ATTEMPTS = 3;

class OtpController {
  async generateOtp(email: string, type: string): Promise<string> {
    try {
      const now = Date.now();

      const existingOtp = await Otp.findOneAndUpdate(
        { email, createdAt: { $gte: new Date(now - validityPeriodMs) } },
        { $inc: { attempts: 1 } },
        { new: true }
      ).lean();

      if (existingOtp) {
        if (existingOtp.attempts > MAX_ATTEMPTS) {
          logger.info(`Max attempts reached for ${email}`);
          throw new Error('Maximum attempts reached. Try again later.');
        }
        return existingOtp.otp;
      }

      const otp = generateOTP(OTP_SIZE, type);
      await Otp.create({ id: new Types.ObjectId(), email, otp });

      return otp;
    } catch (error: any) {
      logger.error('OTP generation failed:', error.message);
      throw new Error(error.message);
    }
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    try {
      
      if (!otp || otp.length !== OTP_SIZE) {
        throw new Error('Invalid OTP');
      }

      const otpDocument = await Otp.findOneAndDelete({
        email,
        otp,
        createdAt: { $gte: new Date(Date.now() - validityPeriodMs) }
      }).select('_id').lean();

      if (!otpDocument) {
        throw new Error('Invalid OTP');
      }

      return true;
    } catch (error: any) {
      logger.error('OTP verification failed:', error.message);
      throw new Error(error.message);
    }
  }
}

export default OtpController;
