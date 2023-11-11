const { isValidEmail } = require("../utils/validator");
const logger = require("../utils/logger");

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

module.exports = middleware;