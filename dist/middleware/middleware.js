"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.validateSpamMiddleware = void 0;
const validator_1 = require("../utils/validator");
const blockListModel_1 = __importDefault(require("../models/blockListModel"));
const logger_1 = __importDefault(require("../utils/logger"));
const spamWords = new Set(process.env.BLOCK_KEYWORDS_RULES?.split(',').map((word) => word.toLowerCase().trim()) || []);
const blockCache = new Map();
const CACHE_EXPIRY_MS = 60 * 1000;
/**
 * Middleware to detect and block spam requests based on IP, email, and content.
 */
const validateSpamMiddleware = async (req, res, next) => {
    try {
        const { email, ...rest } = req.body;
        const bodyText = Object.values(rest).join(' ').toLowerCase();
        const ip = req.ip;
        const now = Date.now();
        const cacheKey = email || ip;
        if (blockCache.has(cacheKey) && now - blockCache.get(cacheKey) < CACHE_EXPIRY_MS) {
            logger_1.default.error('Spam detected: Blocked by cache');
            res.status(400).json({ error: 'Spam detected' });
            return;
        }
        const blocklist = await blockListModel_1.default.findOne({ $or: [{ email }, { ip }] }, { email: 1, ip: 1 }).lean();
        if (blocklist) {
            blockCache.set(cacheKey, now);
            logger_1.default.error('Spam detected: Blocked IP or email');
            res.status(400).json({ error: 'Spam detected' });
            return;
        }
        for (const word of spamWords) {
            if (bodyText.includes(word)) {
                await blockListModel_1.default.create({ ip, email });
                blockCache.set(cacheKey, now);
                logger_1.default.error('Spam detected: Contains blocked keywords');
                res.status(400).json({ error: 'Spam detected' });
                return;
            }
        }
        next();
    }
    catch (error) {
        logger_1.default.error('Error in spam validation middleware', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.validateSpamMiddleware = validateSpamMiddleware;
/**
 * Middleware to validate email format.
 */
const validateEmail = (req, res, next) => {
    if (!(0, validator_1.isValidEmail)(req.body.email)) {
        logger_1.default.error('Invalid email');
        res.status(400).json({ error: 'Invalid email' });
        return;
    }
    next();
};
exports.validateEmail = validateEmail;
