"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const otpModel_1 = __importDefault(require("../models/otpModel"));
const generateOTP_1 = __importDefault(require("../utils/generateOTP"));
const logger_1 = __importDefault(require("../utils/logger"));
const mongoose_1 = require("mongoose");
const validityPeriodMs = parseInt(process.env.OTP_VALIDITY_PERIOD_MINUTES || '5') * 60 * 1000;
const OTP_SIZE = parseInt(process.env.OTP_SIZE || '6');
const MAX_ATTEMPTS = 3;
class OtpController {
    async generateOtp(email, type) {
        try {
            const now = Date.now();
            const existingOtp = await otpModel_1.default.findOneAndUpdate({ email, createdAt: { $gte: new Date(now - validityPeriodMs) } }, { $inc: { attempts: 1 } }, { new: true }).lean();
            if (existingOtp) {
                if (existingOtp.attempts > MAX_ATTEMPTS) {
                    logger_1.default.info(`Max attempts reached for ${email}`);
                    throw new Error('Maximum attempts reached. Try again later.');
                }
                return existingOtp.otp;
            }
            const otp = (0, generateOTP_1.default)(OTP_SIZE, type);
            await otpModel_1.default.create({ id: new mongoose_1.Types.ObjectId(), email, otp });
            return otp;
        }
        catch (error) {
            logger_1.default.error('OTP generation failed:', error.message);
            throw new Error(error.message);
        }
    }
    async verifyOtp(email, otp) {
        try {
            if (!otp || otp.length !== OTP_SIZE) {
                throw new Error('Invalid OTP');
            }
            const otpDocument = await otpModel_1.default.findOneAndDelete({
                email,
                otp,
                createdAt: { $gte: new Date(Date.now() - validityPeriodMs) }
            }).select('_id').lean();
            if (!otpDocument) {
                throw new Error('Invalid OTP');
            }
            return true;
        }
        catch (error) {
            logger_1.default.error('OTP verification failed:', error.message);
            throw new Error(error.message);
        }
    }
}
exports.default = OtpController;
