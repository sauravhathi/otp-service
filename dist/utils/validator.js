"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = void 0;
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [localPart, domain] = email.split("@");
    const allowedDomains = process.env.ALLOWED_DOMAINS
        ? process.env.ALLOWED_DOMAINS.split(",")
        : [];
    const minLocalPartLength = 5;
    const maxLocalPartLength = 64;
    return ((allowedDomains.length === 0 || allowedDomains.includes(domain)) &&
        localPart.length >= minLocalPartLength &&
        localPart.length <= maxLocalPartLength &&
        emailRegex.test(email));
};
exports.isValidEmail = isValidEmail;
