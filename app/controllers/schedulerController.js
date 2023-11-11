const cron = require('node-cron');
const otpController = require('./otpController');
const logger = require('../utils/logger');
const cronSchedule = process.env.CRON_SCHEDULE || '0 0 * * *';

// Clear expired OTPs every day at midnight by default
// cron.schedule(cronSchedule, async () => {
//     try {
//         await otpController.clearExpiredOtps();
//         logger.info('Cleared expired OTPs');
//     } catch (error) {
//         logger.error('Failed to clear expired OTPs', error.message);
//     }
// });

const scheduledTask = cron.schedule(cronSchedule, async () => {
    try {
        await otpController.clearExpiredOtps();
        logger.info('Cleared expired OTPs');
    } catch (error) {
        logger.error('Failed to clear expired OTPs', error.message);
    }
});

module.exports = scheduledTask;