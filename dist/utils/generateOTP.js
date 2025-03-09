"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const generateOTP = (size, type) => {
    if (size < 1 && size > 10) {
        logger_1.default.error('Invalid OTP size');
        throw new Error('Invalid OTP size');
    }
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    let otpChars = '';
    if (type === 'numeric') {
        otpChars = numbers;
    }
    else if (type === 'alphanumeric') {
        otpChars = numbers + characters;
    }
    else if (type === 'alphabet') {
        otpChars = characters;
    }
    else {
        logger_1.default.error('Invalid OTP type');
        throw new Error('Invalid OTP type');
    }
    let otp = '';
    for (let i = 0; i < size; i++) {
        otp += otpChars.charAt(Math.floor(Math.random() * otpChars.length));
    }
    return otp;
};
exports.default = generateOTP;
