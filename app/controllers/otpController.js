const Otp = require('../models/otpModel');
const generateOTP = require('../utils/generateOTP');
const logger = require('../utils/logger');
const validityPeriodMinutes = parseInt(process.env.OTP_VALIDITY_PERIOD_MINUTES);
const OTP_SIZE = parseInt(process.env.OTP_SIZE);

const otpController = {
    generateOtp: async (email, type) => {
        try {
            // Check if an OTP has already been generated for this email
            const existingOtp = await Otp.findOne({
                email: email,
                createdAt: {
                    $gte: new Date(new Date() - validityPeriodMinutes * 60 * 1000),
                },
            }).lean();

            if (existingOtp) {
                logger.info(`OTP ${existingOtp.otp} already exists for ${email}`);
                return existingOtp.otp;
            }

            const otp = generateOTP(OTP_SIZE, type);

            const otpDocument = new Otp({
                id: new Date().getTime(),
                email: email,
                otp: otp,
            });

            await otpDocument.save();

            logger.info(`Generated OTP ${otp} for ${email}`);
            return otp;
        } catch (error) {
            logger.error("Failed to generate OTP", error.message);
            throw new Error('Failed to generate OTP');
        }
    },
    verifyOtp: async (email, otp) => {
        try {
            if (otp.toString().length !== OTP_SIZE) {
                throw new Error('Invalid OTP');
            }

            const otpDocument = await Otp.findOneAndDelete({
                email: email,
                otp: otp,
                createdAt: { $gte: new Date(new Date() - 1000 * 60 * validityPeriodMinutes) }
            }).lean();

            if (!otpDocument) {
                throw new Error('Invalid OTP');
            }

            logger.info(`Verified OTP ${otp} for ${email}`);
            return true;
        } catch (error) {
            logger.error("Failed to verify OTP", error.message);
            throw new Error(error.message);
        }
    },
    clearExpiredOtps: async () => {
        try {
            // Clear expired OTPs
            const cutoffTime = new Date(new Date() - 1000 * 60 * validityPeriodMinutes);
            await Otp.deleteMany({ createdAt: { $lt: cutoffTime } });
        } catch (error) {
            logger.error("Failed to clear expired OTPs", error.message);
            throw new Error('Failed to clear expired OTPs');
        }
    },
};

module.exports = otpController;