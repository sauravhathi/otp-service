"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const otpController_1 = __importDefault(require("../controllers/otpController"));
const sendMailController_1 = __importDefault(require("../controllers/sendMailController"));
const logger_1 = __importDefault(require("../utils/logger"));
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
const otpController = new otpController_1.default();
const sendMailController = new sendMailController_1.default();
/**
 * Route to generate OTP and send it via email
 */
router.post('/otp/generate', middleware_1.validateSpamMiddleware, async (req, res) => {
    try {
        const { email, type = 'numeric', organization = 'Saurav Hathi', subject = 'One-Time Password (OTP)' } = req.body;
        const otp = await otpController.generateOtp(email, type);
        await sendMailController.sendMail(email, otp, organization, subject);
        res.status(200).json({ message: 'OTP is generated and sent to your email' });
    }
    catch (error) {
        logger_1.default.error('Failed to generate OTP', error.message);
        res.status(400).json({ error: error.message });
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
    }
    catch (error) {
        logger_1.default.error('Failed to verify OTP', error.message);
        res.status(400).json({ error: error.message });
    }
});
exports.default = router;
