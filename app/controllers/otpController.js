const Otp = require('../models/otpModel');
const validityPeriodMinutes = process.env.OTP_VALIDITY_PERIOD_MINUTES;

const generateOTP = (size) => {
    if (size < 1 || size > 10) {
      throw new Error('OTP size must be between 1 and 10 digits.');
    }
  
    const min = 10 ** (size - 1);
    const max = 10 ** size - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const otpController = {
    generateOtp: async (email) => {
        try {
            // Check if an OTP has already been generated for this email
            const existingOtp = await Otp.findOne({
                email: email,
                createdAt: {
                    $gte: new Date(new Date() - validityPeriodMinutes * 60 * 1000), // Calculate the time window
                },
            });

            if (existingOtp) {
                return existingOtp.otp;
            }

            const otp = generateOTP(process.env.OTP_SIZE);

            const otpDocument = new Otp({
                id: new Date().getTime(),
                email: email,
                otp: otp,
                createdAt: new Date(),
            });

            await otpDocument.save();

            return otp;
        } catch (error) {
            throw new Error('Failed to generate OTP');
        }
    },
    verifyOtp: async (email, otp) => {
        try {

            if (otp.toString().length !== parseInt(process.env.OTP_SIZE)) {
                throw new Error('Invalid OTP');
            }
            
            const otpDocument = await Otp.findOneAndDelete({
                email: email,
                otp: otp,
                createdAt: { $gte: new Date(new Date() - 1000 * 60 * validityPeriodMinutes) }
            });

            if (!otpDocument) {
                throw new Error('Invalid OTP');
            }

            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    clearExpiredOtps: async () => {
        try {
            // Clear expired OTPs
            const cutoffTime = new Date(new Date() - 1000 * 60 * validityPeriodMinutes);
            await Otp.deleteMany({ createdAt: { $lt: cutoffTime } });
        } catch (error) {
            throw new Error('Failed to clear expired OTPs');
        }
    },
};

module.exports = otpController;