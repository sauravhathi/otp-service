const cron = require('node-cron');
const otpController = require('./otpController');
const cronSchedule = process.env.CRON_SCHEDULE || '0 0 * * *';

// Clear expired OTPs every day at midnight by default
cron.schedule(cronSchedule, async () => {
    try {
        await otpController.clearExpiredOtps();
        console.log('Cleared expired OTPs');
    } catch (error) {
        console.log(error.message);
    }
});