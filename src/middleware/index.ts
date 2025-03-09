import { Request, Response, NextFunction } from 'express';
import { isValidEmail } from '../utils/validator';
import Blocklist from '../models/blockListModel';
import logger from '../utils/logger';

const spamWords = new Set(
    process.env.BLOCK_KEYWORDS_RULES?.split(',').map((word) => word.toLowerCase().trim()) || []
);

const blockCache = new Map<string, number>();
const CACHE_EXPIRY_MS = 60 * 1000;

/**
 * Middleware to detect and block spam requests based on IP, email, and content.
 */
export const validateSpamMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, ...rest } = req.body;
        const bodyText = Object.values(rest).join(' ').toLowerCase();

        const ip = req.ip;
        const now = Date.now();
        const cacheKey = email || ip;

        if (blockCache.has(cacheKey) && now - blockCache.get(cacheKey)! < CACHE_EXPIRY_MS) {
            logger.error('Spam detected: Blocked by cache');
            res.status(400).json({ error: 'Spam detected' });
            return;
        }


        const blocklist = await Blocklist.findOne({ $or: [{ email }, { ip }] }, { email: 1, ip: 1 }).lean();
        if (blocklist) {
            blockCache.set(cacheKey, now);
            logger.error('Spam detected: Blocked IP or email');
            res.status(400).json({ error: 'Spam detected' });
            return;
        }

        for (const word of spamWords) {
            if (bodyText.includes(word)) {
                await Blocklist.create({ ip, email });
                blockCache.set(cacheKey, now);
                logger.error('Spam detected: Contains blocked keywords');
                res.status(400).json({ error: 'Spam detected' });
                return;
            }
        }

        next();
    } catch (error) {
        logger.error('Error in spam validation middleware', (error as Error).message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Middleware to validate email format.
 */
export const validateEmail = (req: Request, res: Response, next: NextFunction): void => {
    if (!isValidEmail(req.body.email)) {
        logger.error('Invalid email');
        res.status(400).json({ error: 'Invalid email' });
        return
    }

    next();
};
