const { isValidEmail } = require("../utils/validator");
const logger = require("../utils/logger");
const Blocklist = require("../models/blockListModel");

const spma_words = process.env.BLOCK_KEYWORDS_RULES ? process.env.BLOCK_KEYWORDS_RULES.split(',') : [];

const getIp = async (req) => {
    try {
        const ipDetails = await fetch("https://ipapi.co/json/");
        const ipDetailsJson = await ipDetails.json();
        return ipDetailsJson.ip;
    } catch (error) {
        return null;
    }
}

const validateSpamMiddleware = async (req, res, next) => {
    const bodyValues = Object.values(req.body);
    const bodyText = bodyValues.join(' ');
    const ip = await getIp(req);

    const blocklist = await Blocklist.findOne({
        $or: [
            { email: req.body.email ? req.body.email : null },
            { ip: ip }
        ]
    }, { email: 1, ip: 1, _id: 0 });

    if (blocklist) {
        logger.error('Spam detected');
        return res.status(400).json({ error: 'Spam detected' });
    }

    if (spma_words.some(word => bodyText.toLowerCase().includes(word.toLowerCase()))) {
        await Blocklist.create({ ip: ip, email: req.body.email ? req.body.email : null });
        logger.error('Spam detected');
        return res.status(400).json({ error: 'Spam detected' });
    }

    next();
}

const validateEmail = (req, res, next) => {
    const { email } = req.body;

    if (!isValidEmail(email)) {
        logger.error('Invalid email');
        return res.status(400).json({ error: 'Invalid email' });
    }

    next();
};

const validateCronRequest = (req, res, next) => {
    const secret = req.query.secret;

    if (secret !== process.env.CRON_SECRET) {
        logger.error('Invalid cron job request');
        return res.status(401).end('Unauthorized');
    }

    next();
};

const middleware = (req, res, next) => {
    const { email } = req.body;

    if (email) {
        validateEmail(req, res, next);
    } else if (req._parsedUrl.pathname === '/api/cron') {
        validateCronRequest(req, res, next);
    }
};

module.exports = {
    middleware,
    validateSpamMiddleware,
}